import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Typography, Form, Input, InputNumber, Button, DatePicker, message, Modal, Table, Empty, Skeleton, Checkbox } from 'antd';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { get, listItems, performAdd, resetItemData } from './redux'

const { Title } = Typography;
const dateFormat = 'YYYY/MM/DD';

const InputForm = (props) => {
    const [displayModal, setDisplayModal] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isLoadingItems, setLoadingItems] = useState(false)
    const [formData, setFormData] = useState({
        id: null,
        number: null,
        date: null,
        dateNeeded: null,
        department: null,
        remarks: null,
        requestedBy: null,
        status: null,
        requestedItems: [],
    })
    const [departments, setDepartments] = useState([
        {
            id: 1,
            name: "Admin"
        }
    ])

    const [columns, setColumns] = useState([
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name',   
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',   
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',   
            render: (object) => object.name 
        },
        {
            title: 'Unit of Measurement',
            dataIndex: 'unit',
            key: 'unit',   
            render: (object) => object.name 
        },
        /*
        {
            title: 'Current Stocks',
            dataIndex: 'stocks',
            key: 'stocks',   
        },
        {
            title: 'Pending PR',
            dataIndex: 'purchase_request',
            key: 'purchase_request',   
        },
        {
            title: 'Pending PO',
            dataIndex: 'purchase_order',
            key: 'purchase_order',   
        },
        {
            title: 'Quarantined',
            dataIndex: 'quarantined',
            key: 'quarantined',   
        }
        */
    ])

    const data = useSelector(state => state.dashboard.purchaseRequests.itemData)
    const itemsList = useSelector(state => state.dashboard.purchaseRequests.listData)

    const { id } = useParams();
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        if(typeof(id) !== 'undefined' && id != null){
            dispatch(get({id: id})).then((response) => {
                setLoading(false)
            })
        }
        else {
            setLoading(false)
        }

        return function cleanup() {
            dispatch(resetItemData())
        };
    }, []);

    useEffect(() => {
        setFormData(data)
    }, [data])
    
    const onItemSelect = (data, isSelected) => {
        console.log('Selected:', data);
        if(isSelected){
            console.log("Select " + data.id)
            var selectedItems = formData.requestedItems.slice()
            selectedItems.push(data)
            setFormData({
                ...formData,
                requestedItems: selectedItems
            })
        }
        else {
            console.log("Unselect " + data.id)
            var selectedItems = formData.requestedItems.slice()
            selectedItems.pop(data)
            setFormData({
                ...formData,
                requestedItems: selectedItems
            })
                
        }
        //
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(formData)

        //save data to database
        var requestedItems = formData.requestedItems.slice()

        for(const [index, value] of requestedItems.entries()){
            requestedItems[index] = {
                item: requestedItems[index],
                quantityRequested: values.requestedItems.undefined[value.id],
                unit: value.unit
            }
        }

        var data = {
            ...values,
            id: formData.id,
            number: null,
            department: null,
            date: values.date.format("YYYY-MM-DD") + 'T' + values.date.format("HH:mm:ss"),
            dateNeeded: values.dateNeeded.format("YYYY-MM-DD") + 'T' + values.dateNeeded.format("HH:mm:ss"),
            requestedBy: {
                id:1
            },
            company: {
                id: props.company
            },
            requestedItems: requestedItems

        }

        console.log(data)
        console.log(id)
        dispatch(performAdd(data))
            .then((response) => {
                if(response.payload.status === 200){
                    message.success('Successfully saved')
                    history.goBack()
                }
                else {
                    message.error("Something went wrong. Unable to add item.")
                }
            })
        
        
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        //message.error(errorInfo)
    };

    const renderColumns = (field) => {
        var filteredColumn = columns.slice()
        const inputColumn = [
            {
                title: 'Quantity Requested',
                key: 'quantityRequested',
                render: row => {
                    return (
                        <Form.Item
                            {...field}
                            name={[field.name, row.id]}
                            fieldKey={[field.fieldKey, row.id]}
                            rules={[{ required: true }]}
                            initialValue={1}
                        >
                            <InputNumber min={1}/>
                        </Form.Item>
                    );
                }
            }
        ]

        filteredColumn = filteredColumn.concat(inputColumn)

        return (filteredColumn)
    }

    const renderItemColumns = () => {
        var filteredColumn = [
            {
                key: 'select',
                render: row => {
                    return (
                        <Checkbox 
                            onChange={(e) => {
                                onItemSelect(row, e.target.checked)
                            }}
                            checked={formData.requestedItems.some((item) => item.id === row.id) ? (true) : (false)}
                        />
                    );
                }
            }
        ]

        const inputColumn = columns.slice()

        filteredColumn = filteredColumn.concat(inputColumn)

        return (filteredColumn)
    }

    const selectItems = () => {
        setDisplayModal(true)
        setLoadingItems(true)
        dispatch(listItems())
            .then((response) => {
                setLoadingItems(false)
            }
        )


    }

    const closeModal = () => {
        setDisplayModal(false)
    }

    return (
        <>
            <Row><Title level={3}>{props.title}</Title></Row>
            <Row>
                <Col span={20}>
                    {
                        isLoading ? (
                            <Skeleton />
                        )
                        : (
                        <Form
                            {...styles.layout}
                            name="form"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}    
                        >
                            <Form.Item
                                label="PRF Number"
                                name="number"
                                initialValue={formData.number === null ? ("AUTOGENERATED UPON CREATION.") : (formData.number)}
                            >
                                <Input 
                                    disabled={true}
                                />
                            </Form.Item>

                            <Form.Item
                                label="PRF Date"
                                name="date"
                                rules={[{ required: true }]}
                                initialValue={ formData.date === null ? (moment()) : (moment(new Date(formData.date)))} 
                            >
                                <DatePicker 
                                    format={dateFormat} 
                                    style={styles.datePicker}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Date Needed"
                                name="dateNeeded"
                                rules={[{ required: true }]}
                                initialValue={ formData.dateNeeded === null ? (moment()) : (moment(new Date(formData.dateNeeded)))}
                            >
                                <DatePicker  
                                    format={dateFormat} 
                                    style={styles.datePicker}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Department"
                                name="department"
                                rules={[{ required: true }]}
                                {...formData && { initialValue: formData.department }}
                            >
                                <Input/>
                            </Form.Item>
                            
                            <Form.List
                                label="Requested Items"
                                name="requestedItems"
                                rules={[{ required: true }]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <Col span={20} offset={1}>
                                        <Table
                                            dataSource={formData.requestedItems}
                                            columns={renderColumns(fields)}
                                            pagination={false}
                                            locale={{emptyText: <Empty description={"No Item Seleted."}/>}} 
                                        />
                                        <Form.ErrorList errors={errors} />
                                    </Col>
                                )}
                            </Form.List>
                            <Form.Item  style={styles.tailLayout}>
                                <Button
                                onClick={() => {
                                    console.log(selectItems())
                                }}
                                style={{ width: "40%", float: "right" }}
                                >
                                    Select/Remove item(s)
                                </Button>
                            </Form.Item>
                            
                            <Form.Item
                                label="Remarks"
                                name="remarks"
                                {...formData && { initialValue: formData.remarks }}
                            >
                                <Input.TextArea/>
                            </Form.Item>
                            <div style={styles.tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button style={{marginRight: "3%"}} onClick={() => {history.goBack()}}>
                                    Cancel
                                </Button>
                            </div>

                        </Form>
                    )}
                </Col>
            </Row>

            <Modal
                title={ "Select Items" }
                visible={displayModal}
                cancelButtonProps={{ style: { display: 'none' } }}
                onOk={closeModal}
                onCancel={closeModal}
                width={1000}
                >
                {
                    isLoadingItems ? (
                        <Skeleton />
                    )
                    : (
                        <Table
                            dataSource={itemsList !== null ? (itemsList) : ([])}
                            columns={renderItemColumns()}
                            pagination={false}
                        />
                    )
                }
            </Modal>

        </>
    )
}

export default InputForm

const styles = {
    layout: {
        labelCol: { 
            span: 6 
        },
        wrapperCol: { 
            span: 15 
        },
    },
    tailLayout: {
        display: "flex",
        flexDirection: "row-reverse",
        width: "87.5%"
        
    },
    datePicker: {
        float: "left"
    }
}