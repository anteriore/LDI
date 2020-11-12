import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Typography,
  Col,
  Button,
  message
} from 'antd';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { PlusOutlined } from '@ant-design/icons';
import { tableHeader, formDetails } from './data';
import SimpleForm from '../../../components/forms/SimpleForm'
import { listRegionCode, createRegionCode, updateRegionCode, deleteRegionCode } from './redux';

const {Title} = Typography;

const RegionCodes = (props) => {
  const { title } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const {
    regionCodeList, 
    action,
    statusMessage
  } = useSelector(state => state.maintenance.regionCodes );

  useEffect(() => {
    dispatch(listRegionCode())
  },[dispatch]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if(action === 'pending'){
        message.info(statusMessage);
      }else if( action === 'error'){
        message.error(statusMessage);
      }else{
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  const handleAddButton = () => {
    setModalTitle("Add New Region");
    setMode('add');
    setIsOpenForm(!isOpenForm);
  }

  const handleEditButton = (row) => {
    setCurrentID(row.id)
    setModalTitle("Edit Region Code");
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  }

  const handleDeleteButton = (row) => {
    dispatch(deleteRegionCode(row)).then(() => {
      dispatch(listRegionCode());
    }).catch( err => {
      message.error(`Something went wrong! details: ${err}`);
    });
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('')
  }

  const onSubmit = (values) => {
    if(mode === 'edit'){
      let newValues = values;
      newValues.id = currentID;

      dispatch(updateRegionCode(newValues)).then(() => {
        dispatch(listRegionCode());
      });
    }else if( mode === 'add' ){
      dispatch(createRegionCode(values)).then(() => {
        dispatch(listRegionCode());
      });

    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  }

  return(
    <Row gutter={[8,24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>
          {title}
        </Title>
        <Button
          icon={ <PlusOutlined/> }
          onClick={() => handleAddButton()}
        >
          Add
        </Button>
      </Col>
      <Col span={20}>
        <TableDisplay 
          columns={tableHeader}
          data={regionCodeList}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton} 
        />
      </Col>
      <SimpleForm 
        visible={isOpenForm} 
        title={modalTitle} 
        onSubmit={onSubmit} 
        values={formValues} 
        onCancel={handleCancelButton}
        formDetails={formDetails}
      />
    </Row>
  )
}

export default RegionCodes;