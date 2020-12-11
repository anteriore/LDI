import React, {useState, useEffect} from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Table,
  Space,
  Button,
  Skeleton,
  Modal,
  Checkbox,
  message, 
  Layout
} from 'antd';
import _ from 'lodash';
import { formDetails } from './data';
import { useForm } from 'antd/lib/form/Form';
import FormItem from '../../../components/forms/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listSalesOrderByDepot } from '../SalesOrders/redux';
import { updateList } from '../../../helpers/general-helper';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, company} = props;
  const [contentLoading, setContentLoading] = useState(true)
  const [showSalesSection, setShowSalesSection] = useState(false)
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      setContentLoading(false)
    })
  },[dispatch]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    }
    let formItem = _.find(newForm.form_items, {name: 'depot'});
    
    const handleDepotChange = (value) => {
      setShowSalesSection(false);
      dispatch(listSalesOrderByDepot(value))
    }  

    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));
  },[dispatch,depotList,tempFormDetails]);

  useEffect(() => {
    if(form.getFieldValue('depot') !== undefined){
      if(salesOrderList.length === 0){
        message.warning("There's no sales orders on this selected depot")
      }else{
        const newForm = tempFormDetails;
        const masterList = {
          salesOrder: salesOrderList,
        }

        setTempFormDetails(updateList(newForm, masterList));
        setShowSalesSection(true)
      }
    }
  }, [salesOrderList, tempFormDetails, form])

  return (
    <>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row span={20} offset={1}>
        <Col span={20} offset={1}>
          {contentLoading ? (
            <Skeleton/>
          ) : (
            <Layout style={styles.layout}>
              <Form
                form={form}
                {...styles.formLayout}
              >
                { _.dropRight(tempFormDetails.form_items, 5).map((item, i) => <FormItem key={i} item={item}/>)}
                { showSalesSection ? (
                  _.dropRight(_.drop(tempFormDetails.form_items,3),1).map((item, i) => <FormItem key={i} item={item}/>)
                ) : ''}
              </Form>
            </Layout>
          )}
        </Col>
      </Row>
    </>
  )
}

export default InputForm;

const styles = {
  formLayout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 11,
      offset: 2
    },
  },
  layout: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  datePicker: {
    display: 'flex',
    justifyContent: 'start',
  },
};