import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Button,
  Modal,
  Space,
  Table,
  Popconfirm,
  message,
} from 'antd';
import {
  PlusOutlined,
  QuestionCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';

import {
  listVoucherPayableByCompany,
  addVoucherPayable,
  approveVoucherPayable,
  rejectVoucherPayable,
  clearData,
} from './redux';
import { listAccountTitles, clearData as clearAccountTitles } from '../AccountTitles/redux';
import {
  listD as listDepartment,
  listA as listArea,
  clearData as clearDeptArea,
} from '../../Maintenance/DepartmentArea/redux';
import {
  listGroupByCompany,
  clearData as clearGroupCat,
} from '../../Maintenance/GroupsCategories/redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';

import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const VoucherPayables = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const isMounted = useRef(true);

  const { list: listData, status, action, statusMessage, statusLevel } = useSelector(
    (state) => state.accounting.voucherPayables
  );
  const user = useSelector((state) => state.auth.user);

  const { company, actions } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
      dispatch(clearAccountTitles());
      dispatch(clearDeptArea());
      dispatch(clearGroupCat());
      dispatch(clearVendor());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Create Voucher Payable');
    setFormData(null);
    setLoading(true);
    dispatch(listAccountTitles({ company, message })).then((response1) => {
      dispatch(listDepartment({ company, message })).then((response2) => {
        dispatch(listArea({ company, message })).then((response3) => {
          dispatch(listGroupByCompany({ company })).then((response4) => {
            dispatch(listVendor({ company, message })).then((response5) => {
              if (isMounted.current) {
                const onSuccess = () => {
                  history.push(`${path}/new`);
                  setLoading(false);
                };
                const onFail = () => {
                  setLoading(false);
                };
                handleRequestResponse(
                  [response1, response2, response3, response4, response5],
                  onSuccess,
                  onFail,
                  ''
                );
              }
            });
          });
        });
      });
    });
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const handleApprove = (data) => {
    setLoading(true);
    dispatch(approveVoucherPayable({ id: data.id, user: user.id })).then(() => {
      setDisplayModal(false);
      setSelectedData(null);
      dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
        setLoading(false);
      });
    });
  };

  const handleReject = (data) => {
    setLoading(true);
    dispatch(rejectVoucherPayable({ id: data.id, user: user.id })).then(() => {
      setDisplayModal(false);
      setSelectedData(null);
      dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
        setLoading(false);
      });
    });
  };

  const processSubmitPayload = (data) => {
    const accountTitles = [];
    data.accountTitles.forEach((item) => {
      accountTitles.push({
        accountTitle: {
          id: item.accountTitle.id,
          type: item.accountTitle.type,
        },
        department: { id: item.department.id },
        group: { id: item.group.id },
        area: { id: item.area.id },
        amount: item?.credit ?? item.debit,
      });
    });
    let voucher = null;
    let vouchers = null;
    switch (data.variation) {
      case '1 Voucher':
        [voucher] = data.vouchers;
        break;
      case 'Multiple PJV':
        vouchers = data.vouchers;
        break;
      case 'Multiple JV':
        vouchers = data.vouchers;
        break;
      default:
        break;
    }

    return {
      ...data,
      accountTitles,
      company: {
        id: company,
      },
      voucher,
      vouchers,
      vendor:
        (data?.vendor ?? null) !== null
          ? {
              id: data.vendor,
            }
          : voucher?.vendor?.id ?? null,
      preparedBy: {
        id: user.id,
      },
    };
  };

  const onSubmit = async (data) => {
    const payload = processSubmitPayload(data);
    await dispatch(addVoucherPayable(payload)).then((response) => {
      setLoading(true);

      const onSuccess = () => {
        dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
          setLoading(false);
          history.goBack();
        });
      };

      const onFail = () => {
        setLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
    return 1;
  };

  // for data display
  const renderTableColumns = (fields) => {
    const columns = [];
    fields.forEach((field) => {
      if (typeof field.render === 'undefined' || field.render === null) {
        field.render = (object) => object;
      }
      if (field.name === 'credit' || field.name === 'debit') {
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) =>
            field.render({ [object.accountTitle.type.toLowerCase()]: object.amount }),
        });
      } else {
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => field.render(object[field.name]),
        });
      }
    });

    return columns;
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
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
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
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
            )}
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
          <Modal
            visible={displayModal}
            onOk={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {selectedData === null ? (
              <Skeleton />
            ) : (
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <ItemDescription
                  title={`${selectedData.number} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Voucher(s): '}</Text>
                <Table
                  dataSource={
                    selectedData.variation === '1 Voucher'
                      ? [selectedData.voucher]
                      : selectedData.vouchers
                  }
                  columns={renderTableColumns(tableDetails.fields)}
                  pagination={false}
                />
                <Text>{'Account Title Entries: '}</Text>
                <Table
                  dataSource={selectedData.accountTitles}
                  columns={renderTableColumns(formDetails.accountTitles.fields)}
                  pagination={false}
                />
                {selectedData.status === 'Pending' && ( // add approval permissions here
                  <>
                    <Text>{'Actions: '}</Text>
                    <Space>
                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleApprove(selectedData);
                        }}
                        onCancel={(e) => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                          icon={<CheckOutlined />}
                          loading={loading}
                          type="primary"
                        >
                          Approve
                        </Button>
                      </Popconfirm>

                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleReject(selectedData);
                        }}
                        onCancel={(e) => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ marginRight: '1%' }}
                          icon={<CloseOutlined />}
                          loading={loading}
                          type="primary"
                          danger
                        >
                          Reject
                        </Button>
                      </Popconfirm>
                    </Space>
                  </>
                )}
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default VoucherPayables;
