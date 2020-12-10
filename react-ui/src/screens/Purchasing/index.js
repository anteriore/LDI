import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Container from '../../components/container';
import TableDisplay from '../../components/TableDisplay';
import FormScreen from '../../components/forms/FormScreen';
import FormDetails, { columns } from './data/'

import { listPO, addPO, deletePO } from './redux';
import { listVendor } from '../Maintenance/Vendors/redux';
import { listD as listDepartment, listA as listArea } from '../Maintenance/DepartmentArea/redux';
import { listUnit } from '../Maintenance/Units/redux';
import { listCompany } from '../../redux/company';
import Modal from 'antd/lib/modal/Modal';

const { TabPane } = Tabs;
const { Title } = Typography;

const Purchasing = () => {
  const [company, setCompany] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingCompany, setLoadingCompany] = useState(true);

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const purchaseOrders = useSelector((state) => state.purchaseOrders.list)
  const companies = useSelector((state) => state.company.companyList);
  
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const formDetails = FormDetails();

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setLoadingCompany(false)
      dispatch(listPO({company: company})).then(() => {
        setLoading(false)
      })
    });
  }, [dispatch]);

  const handleChangeTab = (id) => {
    setCompany(id)
    setLoading(true)
    dispatch(listPO({company: id})).then(() => {
      setLoading(false)
    })
  };

  const handleAdd = () => {
    setFormTitle('Create Purchase Order');
    setFormMode('add');
    setFormData(null);
    dispatch(listVendor({ company })).then(() => {
      dispatch(listDepartment({ company })).then(() => {
        dispatch(listArea({ company })).then(() => {
          dispatch(listUnit({ company })).then(() => {
            history.push(`${path}/new`);
          })
        })
      })
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Purchase Order');
    setFormMode('edit');
    var poData = purchaseOrders.find(po => po.id === data.id)
    var orderedItems = []
    poData.orderedItems.forEach((item) => {
      orderedItems.push({
        ...item,
        unit: item.unit.id
      })
    })
    const formData = {
      ...poData,
      date: moment(new Date(data.date)) || moment(),
      dueDate: moment(new Date(data.dueDate)) || moment(),
      department: poData.department !== null ? poData.department.id : null,
      area: poData.area !== null ? poData.area.id : null,
      vendor: poData.vendor !== null ? poData.vendor.id : null,
      orderedItems: orderedItems
    };
    setFormData(formData);
    dispatch(listVendor({ company })).then(() => {
      dispatch(listDepartment({ company })).then(() => {
        dispatch(listArea({ company })).then(() => {
          dispatch(listUnit({ company })).then(() => {
            history.push(`${path}/${data.id}`);
          })
        })
      })
    });
  };

  const handleDelete = (data) => {
  };

  const handleRetrieve = (data) => {
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
    console.log(data)
    var orderedItems = []
    data.orderedItems.forEach((item) => {
      orderedItems.push({
        ...item,
        unit: {
          id: item.unit
        }
      })
    })
    var payload = {
      ...data,
      number: null,
      company: {
        id: company
      },
      department: {
        id: data.department,
      },
      area: {
        id: data.area,
      },
      vendor: {
        id: data.vendor,
      },
      orderedItems: orderedItems
    }
    console.log(payload)
    
    if(formMode === 'edit'){
      payload.id = formData.id
      payload.number = formData.number
    }

    
    dispatch(addPO(payload)).then((response) => {
      setLoading(true);
      if(response.payload.status === 200){
        dispatch(listPO({ company })).then((response) => {
          setLoading(false);
          history.goBack();
          if(formMode === 'edit'){
            message.success(`Successfully updated ${formData.number}`);
          }
          else {
            message.success(`Successfully added purchase order "${response.payload.number}"`);
          }
        })
      }
      else {
        setLoading(false);
        if(formMode === 'edit'){
          message.error(`Unable to update ${formData.number}`);
        }
        else {
          message.error(`Unable to add purchase order`);
        }
      }
    })
  }

  const renderModal = () => {
    return (
      <Modal
        visible={true}
        title={"Modal"}
      >

      </Modal>
    )
  }

  return (
    <Container location={{ pathname: path }}>
      <Switch>
        <Route exact path={path}>
          <Row>
            <Title level={3}>Purchase Orders</Title>
          </Row>
          {loadingCompany ? (
            <Skeleton />
          ) : (
            <Row>
              <Col span={20}>
                <Tabs defaultActiveKey="company.id" onChange={handleChangeTab}>
                  {companies.map((val) => (
                    <TabPane tab={val.name} key={val.id}/>
                  ))}
                </Tabs>

                <Button
                  style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                  icon={<PlusOutlined />}
                  onClick={(e) => {
                    handleAdd();
                  }}
                >
                  Add
                </Button>
                
                {loading ? (
                  <Skeleton />
                ) : (
                <TableDisplay
                  columns={columns}
                  data={purchaseOrders}
                  handleRetrieve={handleRetrieve}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
                )}
              </Col>
            </Row>
          )}
        </Route>
        <Route path={`${path}/new`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
            formModal={renderModal}
          />
        </Route>
        <Route path={`${path}/:id`}>
          <FormScreen
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails} 
          />
        </Route>
      </Switch>
    </Container>
  );
};

export default Purchasing;
