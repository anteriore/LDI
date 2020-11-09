import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Typography, Button, Modal, Skeleton, Empty, message } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay'
import { listD, addD, deleteD, listA, addA, deleteA } from './redux'
import SimpleForm from '../../../components/forms/SimpleForm';

const { Title } = Typography;

const DepartmentArea = (props) => {
    const [loading, setLoading] = useState(false)

    const [displayFormD, setDisplayFormD] = useState(false);
    const [displayFormA, setDisplayFormA] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formMode, setFormMode] = useState('');
    const [formDataA, setFormDataA] = useState(null);
    const [formDataD, setFormDataD] = useState(null);

    const [deptColumns, setDeptColumns] = useState([
        {
            title: 'Dept. Code',
            dataIndex: 'code',
            key: 'code',
            datatype: "string"
        },
        {
            title: 'Dept. Name',
            dataIndex: 'name',
            key: 'name',
            datatype: "string"  
        }
    ])

    const [areaColumns, setAreaColumns] = useState([
        {
            title: 'Area Code',
            dataIndex: 'code',
            key: 'code',
            datatype: "string"
        },
        {
            title: 'Area Name',
            dataIndex: 'name',
            key: 'name',
            datatype: "string"  
        }
    ])

    const formDetailD = {
        form_name: "departments",
        form_items: [
            {
            label: "Name",
            name: "name",
            rules: [[{ required: true, message: 'Please provide a proper department name' }]],
            placeholder: "Department name"
            },
            {
            label: "Code",
            name: "code",
            rules: [[{ required: true, message: 'Please provide a proper department code' }]],
            placeholder: "Department code"
            },
        ]
    }

    const formDetailA = {
        form_name: "areas",
        form_items: [
            {
            label: "Name",
            name: "name",
            rules: [[{ required: true, message: 'Please provide a proper area name' }]],
            placeholder: "Area name"
            },
            {
            label: "Code",
            name: "code",
            rules: [[{ required: true, message: 'Please provide a proper area code' }]],
            placeholder: "Area code"
            },
        ]
    }

    const company = props.company
    const dispatch = useDispatch();
    const deptData = useSelector(state => state.maintenance.departmentArea.deptList) 
    const areaData = useSelector(state => state.maintenance.departmentArea.areaList) 

    useEffect(() => {
        dispatch(listD({company: company}))
        dispatch(listA({company: company}))
    }, [])

    const handleAddD = () => {
        setFormTitle("Add Department");
        setFormMode('add');
        setFormDataD(null)
        setDisplayFormD(true);
        setDisplayFormA(false);
    }
    
    const handleUpdateD = (data) => {
        setFormTitle("Edit Department");
        setFormMode('edit');
        setDisplayFormD(true);
        setDisplayFormA(false);
        setFormDataD(data)
    }

    const handleDeleteD = (data) => {
        dispatch(deleteD(data.id))
        .then((response) => {
            dispatch(listD({company: company}))
            message.success("Successfully deleted Department " + data.name)
        })
    }

    const handleAddA = () => {
        setFormTitle("Add Area");
        setFormMode('add');
        setFormDataA(null)
        setDisplayFormD(false);
        setDisplayFormA(true);
    }
    
    const handleUpdateA = (data) => {
        setFormTitle("Edit Area");
        setFormMode('edit');
        setDisplayFormD(false);
        setDisplayFormA(true);
        setFormDataA(data)
    }

    const handleDeleteA = (data) => {
        dispatch(deleteA(data.id))
            .then((response) => {
                dispatch(listA({company: company}))
                message.success("Successfully deleted Area " + data.name)
            })
    }
    const handleRetrieve = (data) => {}

    const handleCancelButton = () => {
        setDisplayFormD(false);
        setDisplayFormA(false);
        setFormDataA(null)
        setFormDataD(null)
    }
    
    const onSubmitD = (values) => {
        if( formMode === 'edit' ){
            const payload = {
                ...values,
                id: formDataD.id,
                company: {
                    id: company
                }
            }
            
            dispatch(addD(payload)).then(() => {
                dispatch(listD({company: company}))
            });
        }
        else if( formMode === 'add' ){
            const payload = {
                ...values,
                company: {
                    id: company
                }
            }
            dispatch(addD(payload)).then(() => {
                dispatch(listD({company: company}))
        });
      
        }

        setDisplayFormD(false);
        setDisplayFormA(false);
        setFormDataA(null)
        setFormDataD(null)
    }

    const onSubmitA = (values) => {
        if( formMode === 'edit' ){
            const payload = {
                ...values,
                id: formDataA.id,
                company: {
                    id: company
                }
            }
            
            dispatch(addA(payload)).then(() => {
                dispatch(listA({company: company}))
            });
        }
        else if( formMode === 'add' ){
            const payload = {
                ...values,
                company: {
                    id: company
                }
            }
            dispatch(addA(payload)).then(() => {
                dispatch(listA({company: company}))
        });
      
        }

        setDisplayFormD(false);
        setDisplayFormA(false);
        setFormDataA(null)
        setFormDataD(null)
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={3}  style={{ "float": "left" }}>{props.title}</Title>
                    
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={10}>
                <Title level={5}  style={{ "float": "left" }}>Departments</Title>
                <Button 
                    style={{ "float": "right" , marginRight: "0.7%" , marginBottom: "1%"}} 
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        handleAddD()
                    }}
                >
                    Add
                </Button>
                <TableDisplay
                    columns={deptColumns} 
                    data={deptData} 
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdateD}
                    handleDelete={handleDeleteD}
                />
                </Col>
                <Col span={10}>
                <Title level={5}  style={{ "float": "left" }}>Areas</Title>
                <Button 
                    style={{ "float": "right" , marginRight: "0.7%" , marginBottom: "1%"}} 
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        handleAddA()
                    }}
                >
                    Add
                </Button>
                <TableDisplay
                    columns={areaColumns} 
                    data={areaData} 
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdateA}
                    handleDelete={handleDeleteA}
                />
                </Col>
                <SimpleForm 
                    visible={displayFormD} 
                    title={formTitle} 
                    onSubmit={onSubmitD} 
                    values={formDataD} 
                    onCancel={handleCancelButton}
                    formDetails={formDetailD}
                />
                <SimpleForm 
                    visible={displayFormA} 
                    title={formTitle} 
                    onSubmit={onSubmitA} 
                    values={formDataA} 
                    onCancel={handleCancelButton}
                    formDetails={formDetailA}
                />
            </Row>
        </>
    )
}

export default DepartmentArea