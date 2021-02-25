import React, {useCallback, useEffect, useState} from 'react';
import { 
  Row, 
  Col, 
  Skeleton,
  Typography, 
  Button,
  Modal,
  Descriptions
} from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { listMaterialReevaluations, clearData, createMaterialReevaluations } from './redux';
import TableDisplay from '../../../components/TableDisplay';
import { formDetails, tableHeader } from './data';
import InputForm from './InputForm';
import { listApprovedReceipts } from '../../Dashboard/ApprovedReceipts/redux';
import GeneralHelper from '../../../helpers/general-helper';
import { formatPayload } from './helpers';
import moment from 'moment';
import statusDialogue from '../../../components/StatusDialogue';

const {Title} = Typography;

const MaterialReevaluations = (props) => {
  const {company, title} = props;
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [matReev, setMatReev] = useState(null);
  const  { handleRequestResponse } = GeneralHelper();
  const { materialReevaluationsList: matReevList, status, action, statusMessage, statusLevel } = useSelector(state => state.dashboard.materialReevaluations)
  const { approvedReceiptsList: ARList } = useSelector(state => state.dashboard.approvedReceipts)

  const onSuccess = useCallback(() => {
    history.push(`${path}/new`);
  },[history, path]);

  const onFailed = useCallback(() => {
    console.log("FAiling")
  }, [])

  useEffect(() => {
    if (status !== 'loading') {
      if (action === 'fetch' && statusLevel !== 'success') {
        statusDialogue({statusMessage, statusLevel}, 'message');
      }

      if (action !== 'fetch') {
        statusDialogue({statusMessage, statusLevel}, 'message');
      }
    }
  },[status, action, statusMessage, statusLevel]);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMaterialReevaluations(company)).then(() => {
      setContentLoading(false);
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });
;

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    }
  },[dispatch, company]);

  const handleAddButton = () => {
    dispatch(listApprovedReceipts(company)).then((dataAR) => {
      handleRequestResponse([dataAR], onSuccess, onFailed, "/material-reevaluations")
    });
  }

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setMatReev(data);
  }

  const onCreate = (value) => {
    setContentLoading(true)
    const payload = formatPayload(value, ARList, company);
    dispatch(createMaterialReevaluations(payload)).then((dataMR) => {
      dispatch(listMaterialReevaluations(company)).then((dataListMR) => {
        handleRequestResponse([dataMR, dataListMR], null, onFailed, "/material-reevaluations")
        setContentLoading(false);
      })
    })
  }

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm title="New Material Reevaluations" onSubmit={onCreate}/>
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
          <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              loading={contentLoading}
              onClick={() => handleAddButton()}
            >
              Add
            </Button>
            {contentLoading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={matReevList}
                handleRetrieve={handleRetrieve}
                deleteEnabled={false}
                updateEnabled={false}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Material Reevaluation Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setMatReev(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setMatReev(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          { matReev === null ? (
            <Skeleton/>
          ) : (
            <>
              <Descriptions
                bordered
                title={`Material Reevaluation ${matReev?.approvedReceipt?.number ?? ""}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                   if (item.type === 'select' || item.type === 'selectSearch') {
                    const itemData = matReev.approvedReceipt;
                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {typeof itemData === 'object' ? itemData.controlNumber : itemData}
                      </Descriptions.Item>
                    );
                  }

                  if (item.type === 'date') {
                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {moment(new Date(matReev[item.name])).format('DD/MM/YYYY')}
                      </Descriptions.Item>
                    );
                  }

                  return (
                    <Descriptions.Item key={item.name} label={item.label}>
                      {typeof matReev[item.name] === 'object' && matReev[item.name] !== null
                        ? matReev[item.name].code
                        : matReev[item.name]}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  )
} 

export default MaterialReevaluations;