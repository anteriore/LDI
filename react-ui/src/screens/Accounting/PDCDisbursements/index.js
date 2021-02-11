import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import FormScreen from '../../../components/forms/FormScreen';

import { listPDCDisbursement, addPDCDisbursement, deletePDCDisbursement, clearData } from './redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';

const { Title, Text } = Typography;

const PDCDisbursements = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title, actions } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedPDC, setSelectedPDC] = useState(null);
  const { formDetails } = FormDetails();

  const pdcDisbursements = useSelector((state) => state.accounting.PDCDisbursements.list);

  useEffect(() => {
    dispatch(listPDCDisbursement({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearVendor());
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create PDC Disbursement');
    setFormMode('add');
    setFormData(null);
    dispatch(listVendor({ company, message })).then(() => {
      history.push(`${path}/new`);
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit PDC Disbursement');
    setFormMode('edit');
    const pdcData = pdcDisbursements.find((pdc) => pdc.id === data.id);
    const cheques = [];
    pdcData.cheques.forEach((cheque) => {
      cheques.push({
        ...cheque,
        date: moment(new Date(cheque.date)) || moment(),
      });
    });
    const formData = {
      ...pdcData,
      date: moment(new Date(data.date)) || moment(),
      payee: pdcData.payee !== null ? pdcData.payee.id : null,
      cheques,
    };
    setFormData(formData);
    dispatch(listVendor({ company, message })).then(() => {
      history.push(`${path}/${data.id}`);
    });
  };

  const handleDelete = (data) => {
    dispatch(deletePDCDisbursement(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listPDCDisbursement({ company, message })).then(() => {
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
    setSelectedPDC(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      payee: {
        id: data.payee,
      },
    };
    console.log(payload);

    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addPDCDisbursement(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listPDCDisbursement({ company, message })).then(() => {
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
      dispatch(addPDCDisbursement(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listPDCDisbursement({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.number}`);
          });
        } else {
          setLoading(false);
          message.error(
            `Unable to add PDC Disbursement. Please double check the provided information.`
          );
        }
      });
    }
    setFormData(null);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
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
            {actions.includes("create") && 
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                handleAdd();
              }}
            >
              Add
            </Button>}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={pdcDisbursements}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={actions.includes("update")}
                deleteEnabled={actions.includes("delete")}
              />
            )}
          </Col>
          <Modal
            visible={displayModal}
            onOk={() => {
              setDisplayModal(false);
              setSelectedPDC(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedPDC(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {selectedPDC === null ? (
              <Skeleton />
            ) : (
              <>
                <Descriptions
                  bordered
                  title={`${selectedPDC.number} Details`}
                  size="default"
                  layout="vertical"
                >
                  {formDetails.form_items.map((item) => {
                    if (!item.writeOnly) {
                      if (item.type === 'select') {
                        const itemData = selectedPDC[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedPDC[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedPDC[item.name]}
                        </Descriptions.Item>
                      );
                    }

                    return null;
                  })}
                </Descriptions>
                <Title
                  level={5}
                  style={{ marginRight: 'auto', marginTop: '2%', marginBottom: '1%' }}
                >
                  Cheques:
                </Title>
                {selectedPDC.cheques.map((item) => {
                  return (
                    <Descriptions
                      style={{ marginTop: '2%' }}
                      bordered
                      title={<Text>{item.number}</Text>}
                      size="small"
                      layout="vertical"
                    >
                      {formDetails.form_items
                        .find((item) => item.name === 'cheques')
                        .fields.map((field) => {
                          if (field.type === 'hidden' || field.type === 'hiddenNumber') {
                            return null;
                          }
                          if (field.type === 'date') {
                            return (
                              <Descriptions.Item label={field.label}>
                                {moment(new Date(item[field.name])).format('DD/MM/YYYY')}
                              </Descriptions.Item>
                            );
                          }

                          return (
                            <Descriptions.Item label={field.label}>
                              {item[field.name]}
                            </Descriptions.Item>
                          );
                        })}
                    </Descriptions>
                  );
                })}
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default PDCDisbursements;
