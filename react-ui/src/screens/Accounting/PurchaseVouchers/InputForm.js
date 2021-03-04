import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Typography, Form, Skeleton, Button, Descriptions, Space, Table } from 'antd';
import FormDetails from './data';
import { useForm } from 'antd/lib/form/Form';
import _ from 'lodash';
import FormItem from '../../../components/forms/FormItem';
import { useSelector } from 'react-redux';
import { updateList } from '../../../helpers/general-helper';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const InputForm = (props) => {
  const { title, onSubmit} = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const { 
    formDetails, 
    manualFormDetails, 
    autoFormDetails, 
    defaultValAuto, 
    defaultValManual, 
    accountTableHeader
  } = FormDetails();
  const { list: listRR } = useSelector(state => state.dashboard.receivingReceipts);
  const { list: listVendor } = useSelector(state => state.maintenance.vendors);
  const { list: listAccounts } = useSelector(state => state.accounting.accountTitles)
  const { deptList, areaList } = useSelector(state => state.maintenance.departmentArea);
  const { groupList } = useSelector(state => state.maintenance.groupsCategories)
  const [tempMainForm, setTempMainForm] = useState(_.clone(formDetails));
  const [tempManualForm, setTempManualForm] = useState(_.clone(manualFormDetails));
  const [tempAutoForm, setTempAutoForm] = useState(_.clone(autoFormDetails));
  const [accountType, setAccountType] = useState(null)
  const [contentLoading, setContentLoading] = useState(true);
  const [subContentLoading, setSubContentLoading] = useState(true);
  const [formType, setFormType] = useState(_.find(formDetails.form_items, {name: 'manual'}).initialValue);
  const [form] = useForm();

  const handleChangeFormType = useCallback((value) => {
    setSubContentLoading(true);
    setFormType(value)
    if (value) {
      form.setFieldsValue(defaultValManual)
    }else {
      form.setFieldsValue(defaultValAuto)
    }
    setSubContentLoading(false)
  },[form, defaultValAuto, defaultValManual])

  const handleChangeRR = useCallback((value) => {
    const selectedRR = _.find(listRR,(o) => o.id === value);
    form.setFieldsValue({
      siNumber: selectedRR?.siNumber ?? "",
      drNumber: selectedRR?.drNumber ?? "",
      poNumber: selectedRR?.poNumber ?? "",
    })
  },[form, listRR]);

  const handleChangeAccount = useCallback((value) => {
    const selectedAccount = _.find(listAccounts, (o) => o.id === value);

    if ( selectedAccount?.type !== undefined && selectedAccount?.type !== null) {
      if (selectedAccount.type === 'Debit') {
        form.setFieldsValue({credit: undefined});
      } else {
        form.setFieldsValue({debit: undefined});
      }
    }
    setAccountType(selectedAccount?.type)
  },[form, listAccounts])

  useEffect(() => {
    const newForm = tempMainForm;
    const masterList = {
      accountTitles: listAccounts,
      department: deptList,
      group: groupList,
      area: areaList,
    }
    const formManualItem = _.find(newForm.form_items, {name: 'manual'});
    const formAccountItem =_.find(newForm.form_items, {name: 'accountTitles'})

    formAccountItem.onChange = (e) => handleChangeAccount(e);
    formManualItem.onChange = (e) => handleChangeFormType(e.target.value);

    setTempMainForm(updateList(newForm, masterList));
    setContentLoading(false);
  },[tempMainForm, handleChangeFormType, handleChangeAccount,areaList, deptList, groupList, listAccounts])

  useEffect(() => {
    setSubContentLoading(true);
    const newForm = tempAutoForm;
    const masterList = {
      rrNumber: listRR
    };

    const formItem = _.find(newForm.form_items, {name: 'rrNumber'});
    formItem.onChange = (e) => handleChangeRR(e);

    setTempAutoForm(updateList(newForm, masterList))
    setSubContentLoading(false);
  },[tempAutoForm, formType, listRR, handleChangeRR]);

  useEffect(() => {
    setSubContentLoading(true)
    const newForm = tempManualForm;
    const masterList = {
      vendor: listVendor
    }

    setTempManualForm(updateList(newForm, masterList));
    setSubContentLoading(false);
  }, [tempManualForm, listVendor])

  const onFail = () => {
    history.push(`/${path.split('/')[1]}/${path.split('/')[2]}`)
  }

  const renderAutoForm = () => tempAutoForm.form_items.map((item) => 
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  );

  const renderManualForm = () => tempManualForm.form_items.map((item) => (
    <FormItem
      onFail={onFail}
      key={item.name}
      item={item}
    />
  ))

  const renderAccountsTable = () => (
    <Descriptions column={7} title="Accounts" layout="vertical" size="small" bordered>
      { _.dropRight(_.drop(tempMainForm.form_items,3),3).map((item) => (
        <Descriptions.Item label={item.label}>
          <FormItem
            disableLabel={true}
            noStyle={true}
            onFail={onFail}
            key={item.name}
            item={item}
          />
        </Descriptions.Item>
      )) }
      <Descriptions.Item label="Debit">
        { accountType === 'Debit' ? 
        <FormItem
          disableLabel={true}
          noStyle={true}
          onFail={onFail}
          key={'debit'}
          item={_.find(tempMainForm.form_items, {name: 'debit'})}
        /> : "" }
        
      </Descriptions.Item>
      <Descriptions.Item label="Credit">
        { accountType === 'Credit' ? 
        <FormItem
          disableLabel={true}
          noStyle={true}
          onFail={onFail}
          key={'credit'}
          item={_.find(tempMainForm.form_items, {name: 'credit'})}
        /> : ""}
      </Descriptions.Item>
      <Descriptions.Item label="Action">
        <Button
          icon={<PlusOutlined/>}
          style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
          type="primary"
        >
          Add
        </Button>
      </Descriptions.Item>
    </Descriptions>
  )

  return (
    <>
      <Row>
        <Title>
          {title}
        </Title>
      </Row>
      <Row>
        <Col span={20} offset={1}>
          {
            contentLoading ? <Skeleton/> : (
              <Form form={form} {...styles.formLayout}>
                {_.dropRight(tempMainForm.form_items, 7).map((item) => (
                  <FormItem
                    onFail={onFail}
                    key={item.name}
                    item={item}
                  />
                ))}
                { subContentLoading ? <Skeleton/> : (
                  formType ? renderManualForm() : renderAutoForm()
                ) }
                { renderAccountsTable() }
                <br/>
                <Table
                  columns={accountTableHeader}
                  dataSource={null}
                />
                <br/>
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
            )   
          }
        </Col>
      </Row>
    </>
  )
}

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
  description: {
    textAlign: 'start',
  },
};