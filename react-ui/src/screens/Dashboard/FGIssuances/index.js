import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Skeleton,
  Typography, 
  Button,
  message,  
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listFGIssuance, addFGIssuance, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const FGIssuances = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.dashboard.FGIssuances.list);
  const user = useSelector((state) => state.auth.user);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  

  useEffect(() => {
    let isCancelled = false;
    dispatch(listFGIssuance({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);
  
  const handleAdd = () => {
    setFormTitle('Create FG Issuance');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listDepot({ company, message })).then(() => {
      history.push(`${path}/new`);
      setLoading(false);
    });
  };

  const handleUpdate = (data) => {
  };

  const handleDelete = (data) => {
  };

  const handleRetrieve = (data) => {
  };

  const onSubmit = (data) => {
    console.log(data)
    const inventoryList = [];
    data.inventoryList.forEach((inventory) => {
      inventoryList.push({
        product: {
          id: inventory.product.id,
        },
        quantity: inventory.quantity
      });
    });
    const payload = {
      ...data,
      company: {
        id: company,
      },
      fromDepot: {
        id: data.fromDepot,
      },
      toDepot: {
        id: data.toDepot,
      },
      requestedBy: {
        id: user.id,
      },
      inventoryList: inventoryList
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addFGIssuance(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listFGIssuance({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.number}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.number}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addFGIssuance(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listFGIssuance({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.number}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to create FG Issuance. Please double check the provided information.`);
        }
      });
    }
    setFormData(null);
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                handleAdd();
              }}
              loading={loading}
            >
              Add
            </Button>
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={false}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default FGIssuances;
