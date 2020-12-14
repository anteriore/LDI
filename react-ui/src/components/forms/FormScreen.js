import React, { useEffect, useState } from 'react';
import { Form, Button, Input, InputNumber, DatePicker, Select, Checkbox, Modal, Row, Col, Typography, Space, Table, Empty } from 'antd';
import { PlusOutlined, MinusCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const FormScreen = (props) => {
  const { title, onCancel, onSubmit, values, formDetails, formModal } = props;
  const [form] = Form.useForm();
  const history = useHistory();
  const { path } = useRouteMatch();
  const [ tableData, setTableData ] = useState(null)
  const tableSettings = formDetails.form_items.find((item) => item.name === formModal.name)
  const dateFormat = 'YYYY/MM/DD';

  const [loadingModal, setLoadingModal] = useState(true)
  const [displayModal, setDisplayModal] = useState(false)

  useEffect(() => {
    if(values !== null){
      form.setFieldsValue(values);
      setTableData(values[formModal.name])
    }
  }, [values, form]);

  const onFinish = (data) => {
    formDetails.form_items.forEach((item) => {
      if(item.type === 'date'){
        data[item.name] = `${data[item.name].format('YYYY-MM-DD')}T${data[item.name].format('HH:mm:ss')}`
      }
    })
    onSubmit(data)
  }

  const handleInputChange = (item, index, event) => {
    var data = { ...tableData}
    var row = data[index]
    row[item] = event
    console.log(data)
    console.log(row)
    var dataArray = []
    for (const [key, value] of Object.entries(data)) {
      dataArray.push(value)
    }
    //console.log(data)
    setTableData(dataArray)
    console.log(tableData)
  };

  const FormItem = ({ item }) => {
    if (item.type === 'select') {
      if(typeof item.render === 'undefined') {
        if (typeof item.selectName === 'undefined') {
          item.selectName = 'name'
        }
        item.render = choice => choice[item.selectName]
      }

      if(item.choices === null || item.choices.length === 0){
        history.push(`/${path.split('/')[1]}`)
        return null
      }
      else {
        return (
          <Form.Item label={item.label} name={item.name} rules={item.rules}>
            <Select placeholder={item.placeholder}>
              {item.choices.map((choice) => (
                <Select.Option value={choice.id}>{item.render(choice)}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      }
      
      
    }
    else if (item.type === 'textArea') {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
        </Form.Item>
      );
    }
    else if(item.type === 'number'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <InputNumber style={styles.inputNumber} min={item.min} max={item.max} readOnly={item.readOnly}/>
        </Form.Item>
      );
    }
    else if(item.type === 'date'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <DatePicker format={dateFormat} style={styles.datePicker} />
        </Form.Item>
      );
    }
    else if(item.type === 'checkList'){
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Checkbox.Group style={styles.inputCheckList}>
              {item.choices.map((choice) => (
                <Row>
                  <Checkbox value={choice.id}>{item.render(choice)}</Checkbox>
                </Row>
              ))}
          </Checkbox.Group>
        </Form.Item>
      )
    }
    else if(item.type === 'list' || item.type === 'listForm'){
      return (
        <div style={styles.formList}>
        <Form.List label={item.label} name={item.name} rules={item.rules}>
          {(fields, { add, remove, errors }) => (
            <>
              <div {...styles.listTailLayout} type="dashed" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Title level={5} style={{marginRight:"auto"}}>{item.label}</Title>
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />}>
                    Add
                  </Button>
                </Form.Item>

                {item.type === 'selectList' && 
                  <Form.Item>
                    <Button onClick={() => add()} icon={<SelectOutlined />}>
                      Select
                    </Button>
                  </Form.Item>
                }
              </div>
              {fields.map(field => (
                 <Space key={field.key} style={styles.listLayout}>
                   
                  {item.fields.map(itemField => {
                    if(itemField.type === 'hidden')
                    {
                      return (
                        <Form.Item
                          {...field}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          hidden={true}
                        >
                          <Input/>
                        </Form.Item>
                      )
                    }
                    else {
                      return (
                        <Form.Item
                          {...field}
                          {...styles.listItems}
                          name={[field.name, itemField.name]}
                          fieldKey={[field.fieldKey, itemField.name]}
                          rules={itemField.rules}
                        >
                          <Input placeholder={itemField.placeholder} />
                        </Form.Item>
                      )
                    }
                  })}
                  <MinusCircleOutlined style={{alignSelf: "center"}} onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.ErrorList errors={errors} />
            </>
          )}
        </Form.List>
        </div>
      )
      
    }
    else if(item.type === 'table'){
      return null
    }
    else {
      return (
        <Form.Item label={item.label} name={item.name} rules={item.rules}>
          <Input placeholder={item.placeholder} maxLength={item.maxLength} readOnly={item.readOnly} />
        </Form.Item>
      );
    }
  };

  

  //for rendering tables
  const renderTableColumns = (item) => {
    var columns = []
    item.fields.forEach((field) => {
      if(!field.readOnly){
        if(field.type === 'number'){
          columns.push({
            title: field.label,
            key: field.name,
            render: (row) => {
              const index = tableData.indexOf(row)
              const rowData = tableData[index]
              return (
                  <InputNumber min={field.min} max={field.max} defaultValue={rowData[field.name]} onChange={(e) => {handleInputChange(field.name, index, e)}} />
              );
            },
          })
        }
        else if(field.type === 'hidden' || field.type === 'hiddenNumber'){
          columns.push({
            key: field.name,
            visible: false,
            /*render: (row) => {
              const index = form.getFieldValue(item.name).indexOf(row)
              return (
                field.type === 'hidden' ? <Input/> : <InputNumber min={field.min} max={field.max}></InputNumber>
              )
            },*/
          })
          
        }
        else if(field.type === 'select'){
          columns.push({
            title: field.label,
            key: field.name,
            visible: false,
            render: (row) => {
              const index = form.getFieldValue(item.name).indexOf(row)
              if(typeof field.render === 'undefined') {
                if (typeof field.selectName === 'undefined') {
                  field.selectName = 'name'
                }
                field.render = choice => choice[field.selectName]
              }
        
              if(field.choices === null || field.choices.length === 0){
                history.push(`/${path.split('/')[1]}`)
                return null
              }
              return (
                  <Select placeholder={field.placeholder}>
                    {field.choices.map((choice) => (
                      <Select.Option value={choice.id}>{field.render(choice)}</Select.Option>
                    ))}
                  </Select>
              )
            },
          })
        }
        else {
          if(typeof field.render === 'undefined' || field.render === null){
            field.render = (object) => object[field.name]
          }
          columns.push({
              title: field.label,
              key: field.name,
              render: (object) => field.render(object)
          })
        }
      }
    })

    return columns

  }

  const onModalSelect = (data, isSelected) => {
    if(formModal !== null && typeof formModal !== 'undefined'){
      if (isSelected) {
        var selectedItems = {}
        selectedItems[formModal.name] = []
        if(form.getFieldValue(formModal.name) !== null && typeof form.getFieldValue(formModal.name) !== 'undefined'){
          selectedItems[formModal.name] = selectedItems[formModal.name].concat(form.getFieldValue(formModal.name))
        }
        var processedData = data
        if(typeof formModal.processData === 'function'){
          processedData = formModal.processData(data)
        }
        selectedItems[formModal.name] = selectedItems[formModal.name].concat(processedData);
        form.setFieldsValue(selectedItems)
        setTableData(form.getFieldValue(formModal.name))
      } 
      else {
        var selectedItems = {}
        selectedItems[formModal.name] = []
        if(form.getFieldValue(formModal.name) !== null && typeof form.getFieldValue(formModal.name) !== 'undefined'){
          selectedItems[formModal.name] = selectedItems[formModal.name].concat(form.getFieldValue(formModal.name))
        }
        var processedData = data
        if(typeof formModal.processData === 'function'){
          processedData = formModal.processData(data)
        }
        if(typeof formModal.selectedKey === 'undefined'){
          formModal.selectedKey = 'id'
        }
        if(typeof formModal.key === 'undefined'){
          formModal.key = 'id'
        }
        //var index = selectedItems[formModal.name].findIndex(item => item[formModal.selectedKey] === data[formModal.key])
        //selectedItems[formModal.name].splice(index, 1)
        selectedItems[formModal.name] = selectedItems[formModal.name].filter((item) => item[formModal.selectedKey] !== data[formModal.key])
        form.setFieldsValue(selectedItems)
        setTableData(form.getFieldValue(formModal.name))
      }
    }
    
  }

  const renderModalColumns = (columns) => {
    var modalColumns = [
      {
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onModalSelect(row, e.target.checked);
              }}
              defaultChecked={formModal.checkSelected(form.getFieldValue(formModal.name), row)}
            />
          );
        },
      },
    ]

    modalColumns = modalColumns.concat(columns);

    return modalColumns

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // message.error(errorInfo)
  };

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
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
          >
            {formDetails.form_items.map((item) => (
              <FormItem item={item} />
            ))}
          </Form>
          {typeof tableSettings !== 'undefined' && 
            <Col span={20} offset={1}>
              <div style={{float: "right"}}>
                <Button type="primary" onClick={() => {setDisplayModal(true); setLoadingModal(false); }} icon={<SelectOutlined />}>
                  Select
                </Button>
              </div>
              <Table
                dataSource={tableData}
                columns={renderTableColumns(tableSettings)}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                summary={tableSettings.summary}
              />
            </Col>}
            <div style={styles.tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                style={{ marginRight: '2%' }}
                onClick={() => {
                  onCancel()
                  history.goBack();
                }}
              >
                Cancel
              </Button>
            </div>
          {!loadingModal && formModal !== null && typeof formModal !== 'undefined' &&
            <Modal
              visible={displayModal}
              title={"Modal"}
              onOk={() => setDisplayModal(false)}
              onCancel={() => setDisplayModal(false)}
              cancelButtonProps={{ style: { display: 'none' } }}
              width={1000}
            >
              <Table
                dataSource={formModal.data}
                columns={renderModalColumns(formModal.columns)}
                pagination={false}
                expandable={{expandedRowRender}}
              />
            </Modal>
          }
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
    borderStyle: "solid",
    borderWidth: 1,
    padding: "2%",
    backgroundColor: "#FAFAFA",
    width: '87.5%',
    marginBottom: "2%",
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
