import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  InputNumber,
  Select,
  Checkbox,
  Modal,
  Row,
  Col,
  Typography,
  Table,
  Empty,
  message,
} from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import FormItem from './FormItem';

const { Title } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formInstance, formDetails, formTable } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const hasTable = formTable !== null && typeof formTable !== 'undefined';

  const [tableData, setTableData] = useState(null);
  const [toggleValue, setToggleValue] = useState(null);

  const [loadingModal, setLoadingModal] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);

  const toggleName = formDetails.toggle_name;

  const [form] = (() => {
    if (typeof formInstance === 'undefined') {
      return Form.useForm();
    } else {
      return [formInstance];
    }
  })();

  useEffect(() => {
    form.setFieldsValue(values);

    if (hasTable && values !== null) {
      setTableData(formTable.getValues(values));
    }
    if (values !== null && toggleName !== null && typeof toggleName !== 'undefined') {
      setToggleValue(values[toggleName]);
    }
    // eslint-disable-next-line
  }, [values, form]);

  const onFinish = (data) => {
    formDetails.form_items.forEach((item) => {
      if (
        item.type === 'date' &&
        typeof data[item.name] !== 'undefined' &&
        data[item.name] !== null
      ) {
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format(
          'HH:mm:ss'
        )}`;
      }
    });

    if (hasTable) {
      data[formTable.name] = tableData;
    }

    onSubmit(data);
  };

  const onFinishFailed = () => {
    // console.log(errorInfo)
    message.error("An error has occurred. Please double check the information you've provided.");
  };

  const handleTableChange = (item, index, event) => {
    const data = { ...tableData };
    const row = data[index];
    row[item] = event;
    const dataArray = [];
    for (const [, value] of Object.entries(data)) {
      dataArray.push(value);
    }
    setTableData(dataArray);
  };

  // for rendering tables
  const renderTableColumns = (item) => {
    const columns = [];
    item.fields.forEach((field) => {
      if (!field.readOnly) {
        if (field.type === 'number') {
          columns.push({
            title: field.label,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row);
              const rowData = tableData[index];
              return (
                <InputNumber
                  min={field.min}
                  max={field.max}
                  defaultValue={rowData[field.name]}
                  onChange={(e) => {
                    handleTableChange(field.name, index, e);
                  }}
                />
              );
            },
          });
        } else if (field.type === 'hidden' || field.type === 'hiddenNumber') {
          columns.push({
            key: field.name,
            visible: false,
          });
        } else if (field.type === 'select') {
          columns.push({
            title: field.label,
            key: field.name,
            visible: false,
            render: (row) => {
              const index = tableData.indexOf(row);
              const rowData = tableData[index];
              if (typeof field.render === 'undefined') {
                if (typeof field.selectName === 'undefined') {
                  field.selectName = 'name';
                }
                field.render = (choice) => choice[field.selectName];
              }

              if (field.choices === null || field.choices.length === 0) {
                onFail();
                return null;
              }
              return (
                <Select placeholder={field.placeholder} defaultValue={rowData[field.name]}>
                  {field.choices.map((choice) => (
                    <Select.Option value={choice.id}>{field.render(choice)}</Select.Option>
                  ))}
                </Select>
              );
            },
          });
        } else {
          if (typeof field.render === 'undefined' || field.render === null) {
            field.render = (object) => object[field.name];
          }
          columns.push({
            title: field.label,
            key: field.name,
            render: (object) => field.render(object),
          });
        }
      }
    });

    return columns;
  };

  // for selecting selecting a new row in a table
  const onModalSelect = (data, isSelected) => {
    let selectedItems = [];
    if (hasTable) {
      if (isSelected) {
        // add existing data
        if (tableData !== null && typeof tableData !== 'undefined') {
          selectedItems = selectedItems.concat(tableData);
        }

        // process the new data before adding if necessary
        let processedData = data;
        if (typeof formTable.processData === 'function') {
          processedData = formTable.processData(data);
        }
        selectedItems = selectedItems.concat(processedData);
        setTableData(selectedItems);
      } else if (tableData !== null && typeof tableData !== 'undefined') {
        selectedItems = tableData;

        // key for the selected item
        if (typeof formTable.selectedKey === 'undefined') {
          formTable.selectedKey = 'id';
        }
        // foreign key that corresponds to the selected item
        if (typeof formTable.foreignKey === 'undefined') {
          formTable.foreignKey = 'id';
        }
        selectedItems = selectedItems.filter(
          (item) => item[formTable.selectedKey] !== data[formTable.foreignKey]
        );
        setTableData(selectedItems);
      }
    }
  };

  // for rendering the columns inside the row selection modal
  const renderModalColumns = (columns) => {
    let modalColumns = [
      {
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onModalSelect(row, e.target.checked);
              }}
              defaultChecked={formTable.checkSelected(tableData, row)}
            />
          );
        },
      },
    ];

    modalColumns = modalColumns.concat(columns);

    return modalColumns;
  };

  const expandedRowRender = (row) => {
    if (formTable.hasOwnProperty('nestedData')) {
      return (
        <>
          <Title level={5}>{formTable.nestedData.label}</Title>
          <Table
            columns={formTable.nestedData.fields}
            dataSource={row[formTable.nestedData.data]}
            pagination={false}
          />
        </>
      );
    }
  };

  const onFail = () => {
    history.push(`${path.replace(new RegExp('/new|[0-9]|:id'), '')}`);
  };

  const onValuesChange = (values) => {
    if (toggleName !== null && typeof toggleName !== 'undefined') {
      if (typeof values[toggleName] !== 'undefined' && toggleValue !== values[toggleName]) {
        setToggleValue(values[toggleName]);
      }
    }
  };

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>
        <Col span={20}>
          <Form
            {...styles.layout}
            form={form}
            initialValues={values}
            name={formDetails.form_name}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            {formDetails.form_items.map((item) => {
              if (item.toggle) {
                if (item.toggleCondition(toggleValue)) {
                  return <FormItem item={item} onFail={onFail} />;
                }
                return null;
              }

              return <FormItem item={item} onFail={onFail} />;
            })}
          </Form>
          {hasTable && (typeof formTable.isVisible === 'undefined' || formTable.isVisible) && (
            <Col span={20} offset={1}>
              <div style={{ float: 'right', marginBottom: '1%' }}>
                <Button
                  onClick={() => {
                    setDisplayModal(true);
                    setLoadingModal(false);
                  }}
                  icon={<SelectOutlined />}
                >
                  {`Select ${formTable.label}`}
                </Button>
              </div>
              <Table
                dataSource={tableData}
                columns={renderTableColumns(formTable)}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                summary={formTable.summary}
              />
            </Col>
          )}
          <div style={styles.tailLayout}>
            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
            <Button
              style={{ marginRight: '2%' }}
              onClick={() => {
                onCancel();
                history.goBack();
              }}
            >
              Cancel
            </Button>
          </div>
          {!loadingModal && hasTable && (
            <Modal
              visible={displayModal}
              title="Modal"
              onOk={() => setDisplayModal(false)}
              onCancel={() => setDisplayModal(false)}
              cancelButtonProps={{ style: { display: 'none' } }}
              width={1000}
            >
              {typeof formTable.nestedData !== 'undefined' && formTable.nestedData !== null ? (
                // for nested tables
                <Table
                  dataSource={formTable.selectData}
                  columns={renderModalColumns(formTable.selectFields)}
                  pagination={false}
                  expandable={{ expandedRowRender }}
                  rowKey={formTable.foreignKey}
                />
              ) : (
                <Table
                  dataSource={formTable.selectData}
                  columns={renderModalColumns(formTable.selectFields)}
                  pagination={false}
                  rowKey={formTable.foreignKey}
                />
              )}
            </Modal>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormScreen;

const styles = {
  layout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  listItems: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  listLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2%',
  },
  tailLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '87.5%',
  },
  listTailLayout: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  formList: {
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '2%',
    // backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: '2%',
  },
  datePicker: {
    float: 'left',
  },
  inputNumber: {
    float: 'left',
  },
  inputCheckList: {
    float: 'left',
  },
};
