import React, { useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import InputForm from './InputForm';
import { formatPayload } from './helpers';

import {
  listOrderSlips,
  createOrderSlips,
  updateOrderSlips,
  deleteOrderSlips,
  clearData,
} from './redux';
import { clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearSO } from '../SalesOrders/redux';

const { Title } = Typography;

const OrderSlips = (props) => {
  const { title, company, actions } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [contentLoading, setContentLoading] = useState(true);
  const { orderSlipsList, action, statusMessage } = useSelector((state) => state.sales.orderSlips);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listOrderSlips({ company, message })).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearSO());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  const handleAddButton = () => {
    history.push(`${path}/new`);
  };

  const handleEditButton = (value) => {
    const { id: rowId } = value;
    setOrderId(id);
    history.push(`${path}/${rowId}/edit`);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteOrderSlips(row))
      .then(() => {
        dispatch(listOrderSlips({ company, message }));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const onCreate = (value, salesOrder, orderedProducts) => {
    const payload = formatPayload(id, company, value, salesOrder, orderedProducts);
    dispatch(createOrderSlips(payload)).then(() => {
      dispatch(listOrderSlips({ company, message }));
    });
  };

  const onUpdate = (value, salesOrder) => {
    const order = formatPayload(id, company, value, salesOrder);
    order.id = orderId;
    dispatch(updateOrderSlips(order)).then(() => {
      dispatch(listOrderSlips({ company, message }));
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Order Slip" onSubmit={onCreate} company={company} />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Order Slip" onSubmit={onUpdate} company={company} />
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            {actions.includes("create") &&
            <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>}
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={orderSlipsList}
                handleUpdate={handleEditButton}
                handleDelete={handleDeleteButton}
                updateEnabled={actions.includes("update")}
                deleteEnabled={actions.includes("delete")}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default OrderSlips;
