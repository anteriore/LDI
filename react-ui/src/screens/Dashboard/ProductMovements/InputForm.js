import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Layout, Typography, Form, Skeleton, Table, Checkbox, Space, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import { EditableCell, EditableRow } from '../../../components/TableRowInput';
import FormItem from '../../../components/forms/FormItem';
import { formDetails, tableProduct, tableProductInventory } from './data';
import { updateList } from '../../../helpers/general-helper';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit } = props;
  const [form] = useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { list: productInvList } = useSelector((state) => state.maintenance.productInventory);
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [contentLoading, setContentLoading] = useState(true);
  const [productModal, setProductModal] = useState(false);
  const [productInv, setProductInv] = useState([]);
  const [requestedProductList, setRequestedProductList] = useState([]);

  const component = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    },
  };

  const handleDepotChange = useCallback(
    (value) => {
      const selectedPI = _.filter(productInvList, (o) => {
        return o.depot.id === value;
      });
      setRequestedProductList([]);
      setProductInv(selectedPI);
    },
    [productInvList]
  );

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    };

    const formItem = _.find(newForm.form_items, { name: 'depot' });
    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));

    setContentLoading(false);
  }, [depotList, tempFormDetails, handleDepotChange]);

  const onItemSelect = (data, isSelected) => {
    if (isSelected) {
      const newData = _.clone(data);

      if (requestedProductList.length !== 0) {
        const { key } = _.last(requestedProductList);
        newData.key = key + 1;
      } else {
        newData.key = 1;
      }

      setRequestedProductList(requestedProductList.concat(newData));
      form.setFieldsValue({ product: requestedProductList.concat(newData) });
    } else {
      const selectedItems = _.remove(requestedProductList, (o) => o.id !== data.id);
      setRequestedProductList(selectedItems);
      form.setFieldsValue({ product: selectedItems });
    }
  };

  const renderProductItemColumns = (rawColumns) => {
    let filteredColumn = [
      {
        title: 'Action',
        key: 'action',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onItemSelect(row, e.target.checked);
              }}
              checked={!!requestedProductList.some((item) => item.id === row.id)}
            />
          );
        },
      },
    ];

    const inputColumn = rawColumns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  const modProductColumn = tableProduct.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          limit: col.limit,
          title: col.title,
          maxLimit: 1000,
          minLimit: 0,
          precisionEnabled: col.precisionEnabled,
          precision: col.precision,
          handleSave: (row) => {
            const newData = [...requestedProductList];
            const index = _.findIndex(newData, (o) => o.key === row.key);
            const item = newData[index];

            newData.splice(index, 1, { ...item, ...row });
            form.setFieldsValue({ product: newData });
            setRequestedProductList(newData);
          },
        };
      },
    };
  });

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`);
  };

  const onFinish = () => {
    onSubmit(form.getFieldsValue());
    history.goBack();
  };

  return (
    <>
      <Row>
        <Title>{title}</Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton />
          ) : (
            <Layout style={styles.layout}>
              <Form form={form} onFinish={onFinish} {...styles.formLayout}>
                {_.dropRight(tempFormDetails.form_items).map((item) => (
                  <FormItem onFail={onFail} key={item.name} item={item} />
                ))}
                {productInv.length !== 0 ? (
                  <Form.Item
                    wrapperCol={{ span: 15, offset: 4 }}
                    name="product"
                    rules={[{ required: true, message: 'Please select a product' }]}
                  >
                    <Table
                      components={component}
                      columns={modProductColumn}
                      rowClassName={() => styles.editableRow}
                      dataSource={requestedProductList}
                      pagination={false}
                    />
                  </Form.Item>
                ) : (
                  ''
                )}
                {productInv.length !== 0 ? (
                  <Form.Item wrapperCol={{ offset: 8, span: 11 }}>
                    <Button
                      onClick={() => setProductModal(true)}
                      style={{ width: '40%', float: 'right' }}
                    >
                      Select/Remove Product item(s)
                    </Button>
                  </Form.Item>
                ) : (
                  ''
                )}
                <FormItem onFail={onFail} item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Layout>
          )}
        </Col>
        <Modal
          title="Product List"
          visible={productModal}
          onCancel={() => setProductModal(false)}
          onOk={() => setProductModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          width={1000}
          footer={null}
        >
          <Table
            columns={renderProductItemColumns(tableProductInventory)}
            rowKey={(record) => record.uid}
            dataSource={productInv}
            pagination={false}
          />
        </Modal>
      </Row>
    </>
  );
};

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 11,
      offset: 2,
    },
  },
  layout: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  datePicker: {
    display: 'flex',
    justifyContent: 'start',
  },
};
