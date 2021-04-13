import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';

import { listAReceipt, addAReceipt, deleteAReceipt, clearData } from './redux';
import { listClient, clearData as clearClient } from '../../Maintenance/Clients/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearOrderSlips } from '../OrderSlips/redux';
import { clearData as clearSalesInvoice } from '../SalesInvoice/redux';
import GeneralHelper, { reevalutateMessageStatus, reevalDependencyMsgStats } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const AcknowledgementReceipts = (props) => {
  const {  handleRequestResponse } = GeneralHelper();
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title, actions } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedAR, setSelectedAR] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const {list, status, statusLevel, statusMessage, action} = useSelector((state) => state.sales.acknowledgementReceipts);
  const { 
    status: statusDepot, statusLevel: statusLevelDepot, 
    statusMessage: statusMessageDepot, action: actionDepot
  } = useSelector(state => state.maintenance.depots);
  const { 
    status: statusClient, statusLevel: statusLevelClient, 
    statusMessage: statusMessageClient, action: actionClient 
  } = useSelector(state => state.maintenance.clients);
  const user = useSelector((state) => state.auth.user);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearClient());
    dispatch(clearDepot());
    dispatch(clearOrderSlips());
    dispatch(clearSalesInvoice());
  }, [dispatch])

  useEffect(() => {
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusClient,
      statusMessage: statusMessageClient,
      action: actionClient, 
      statusLevel: statusLevelClient,
      module: 'Clients'
    })
  }, [actionClient, statusMessageClient, statusClient, statusLevelClient]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: 'Depots'
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    dispatch(listAReceipt({ company, message })).then(() => {
      if (isMounted.current) {
        setLoading(false)
      } else {
        performCleanup();
      }
    });

    return function cleanup() {
      isMounted.current = false;
    };
  }, [dispatch, company, performCleanup]);

  const handleAdd = () => {
    setFormTitle('Create Acknowledgement Receipt');
    setFormData(null);
    setLoading(true);
    dispatch(clearOrderSlips());
    dispatch(clearSalesInvoice());
    dispatch(listClient({ company, message })).then((resp1) => {
      dispatch(listDepot({ company, message })).then((resp2) => {
        if(isMounted.current){
          const onSuccess = () => {
              history.push(`${path}/new`);
              setLoading(false);
          }
          const onFail = () => {
            setLoading(false);
          }
          handleRequestResponse([resp1, resp2], onSuccess, onFail, '');
        }
        else {
          performCleanup()
        }
      });
    })
  }

  const handleUpdate = () => {
    message.error('Unable to perform action.');
  };

  const handleDelete = (data) => {
    dispatch(deleteAReceipt(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listAReceipt({ company, message })).then(() => {
          setLoading(false);
          message.success(`Successfully deleted ${data.number}`);
        });
      } else {
        setLoading(false);
        message.error(`Unable to delete ${data.number}`);
      }
    });
  };

  const handleRetrieve = (data) => {
    setSelectedAR(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const payments = [];
    let totalSI = 0
    let totalOS = 0;
    data.payments.forEach((payment) => {
      if(payment.type === 'DR_SI'){
        totalSI += payment.appliedAmount
      }
      else {
        totalOS += payment.appliedAmount
      }
      payments.push({
        reference: {
          ...payment,
        },
        appliedAmount: payment.appliedAmount,
      });
    });

    const payload = {
      ...data,
      company: {
        id: company,
      },
      depot: {
        id: data.depot,
      },
      client: {
        id: data.client,
      },
      preparedBy: {
        id: user.id,
      },
      payments,
      osAmount: totalOS,
      siAmount: totalSI,
    };
    await dispatch(addAReceipt(payload)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        history.goBack();
        dispatch(listAReceipt({ company, message })).then(() => {
          setLoading(false);
        });
      };

      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
    return 1
  };

  const renderTableColumns = (item) => {
    const columns = [];
    item.fields.forEach((field) => {
      if (!field.writeOnly) {
        if (typeof field.render === 'undefined' || field.render === null) {
          field.render = (object) => object[field.name];
        }
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => field.render(object),
        });
      }
    });

    return columns;
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm
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
        <InputForm
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
              {title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                icon={<PlusOutlined />}
                loading={loading}
                onClick={() => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={list}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={false}
              />
            )}
          </Col>
          <Modal
            visible={displayModal}
            onOk={() => {
              setDisplayModal(false);
              setSelectedAR(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedAR(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {selectedAR === null ? (
              <Skeleton />
            ) : (
              <>
                <Descriptions
                  bordered
                  title={`${selectedAR.number} Details`}
                  size="default"
                  layout="vertical"
                >
                  {formDetails.form_items.map((item) => {
                    if (!item.writeOnly) {
                      if (selectedAR[item.name] === null && item.toggle) {
                        return null;
                      }
                      if (item.type === 'select' || item.type === 'selectSearch') {
                        const itemData = selectedAR[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedAR[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedAR[item.name]}
                        </Descriptions.Item>
                      );
                    }

                    return null;
                  })}
                </Descriptions>
                <Text>Payment Details:</Text>
                <Table
                  dataSource={tableDetails.getValues(selectedAR)}
                  columns={renderTableColumns(tableDetails)}
                  pagination={false}
                />
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default AcknowledgementReceipts;
