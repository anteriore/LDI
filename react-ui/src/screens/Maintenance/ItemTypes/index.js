import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay'
import { listIT, addIT, deleteIT } from './redux'
import SimpleForm from '../../../components/forms/SimpleForm';

const { Title } = Typography;

const ItemTypes = (props) => {
    const [displayForm, setDisplayForm] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formMode, setFormMode] = useState('');
    const [formData, setFormData] = useState(null);

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            datatype: "string"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            datatype: "string"  
        }
    ];

    const formDetail = {
        form_name: "itemtypes",
        form_items: [
            {
            label: "Name",
            name: "name",
            rules: [[{ required: true, message: 'Please provide a proper item type name' }]],
            placeholder: "Item type name"
            },
            {
            label: "Code",
            name: "code",
            rules: [[{ required: true, message: 'Please provide a proper item type code' }]],
            placeholder: "Item type code"
            },
        ]
    }

    const company = props.company
    const dispatch = useDispatch();
    const data = useSelector(state => state.maintenance.itemTypes.list) 

    useEffect(() => {
        dispatch(listIT({company: company}))
    }, [dispatch, company])

    const handleAdd = () => {
        setFormTitle("Add Item Type");
        setFormMode('add');
        setFormData(null)
        setDisplayForm(true);
    }
    
    const handleUpdate = (data) => {
        setFormTitle("Edit Item Type");
        setFormMode('edit');
        setDisplayForm(true);
        setFormData(data)
    }

    const handleDelete = (data) => {
        dispatch(deleteIT(data.id))
        .then((response) => {
            dispatch(listIT({company: company}))
            message.success("Successfully deleted Item Type " + data.name)
        })
    }

    const handleRetrieve = (data) => {}

    const handleCancelButton = () => {
        setDisplayForm(false);
        setFormData(null)
    }
    
    const onSubmit = (values) => {
        if( formMode === 'edit' ){
            const payload = {
                ...values,
                id: formData.id,
                company: {
                    id: company
                }
            }
            
            dispatch(addIT(payload)).then(() => {
                dispatch(listIT({company: company}))
            });
        }
        else if( formMode === 'add' ){
            const payload = {
                ...values,
                company: {
                    id: company
                }
            }
            dispatch(addIT(payload)).then(() => {
                dispatch(listIT({company: company}))
        });
      
        }

        setDisplayForm(false);
        setFormData(null)
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={3}  style={{ "float": "left" }}>{props.title}</Title>
                    
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={20}>
                <Button 
                    style={{ "float": "right" , marginRight: "0.7%" , marginBottom: "1%"}} 
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        handleAdd()
                    }}
                >
                    Add
                </Button>
                <TableDisplay
                    columns={columns} 
                    data={data} 
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
                </Col>
                <SimpleForm 
                    visible={displayForm} 
                    title={formTitle} 
                    onSubmit={onSubmit} 
                    values={formData} 
                    onCancel={handleCancelButton}
                    formDetails={formDetail}
                />
            </Row>
        </>
    )
}

export default ItemTypes