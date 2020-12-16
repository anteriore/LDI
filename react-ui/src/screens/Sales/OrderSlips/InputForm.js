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
  message, 
  Layout
} from 'antd';
import _ from 'lodash';
import { formDetails, salesOrderHeader, salesInfoHeader } from './data';
import { useForm } from 'antd/lib/form/Form';
import FormItem from '../../../components/forms/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { listDepot } from '../../Maintenance/Depots/redux';
import { listSalesOrderByDepot } from '../SalesOrders/redux';
import { updateList } from '../../../helpers/general-helper';
import { useHistory, useParams } from 'react-router-dom';
import { formatSOList, formatSalesProduct, formatSalesInfo } from './helpers';

const {Title} = Typography;

const InputForm = (props) => {
  const {title, company} = props;
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true)
  const [showSalesSection, setShowSalesSection] = useState(false)
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [selectedSales, setSelectedSales] = useState(null);
  const { user } = useSelector((state) => state.auth)
  const { list: depotList } = useSelector((state) => state.maintenance.depots);
  const { salesOrderList } = useSelector((state) => state.sales.salesOrders);
  const [form] = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDepot()).then(() => {
      form.setFieldsValue({
        preparedBy: `${user.firstName} ${user.lastName}`,
        releasedBy: `${user.firstName} ${user.lastName}`,
        checkedBy: `${user.firstName} ${user.lastName}`, 
      })
      setContentLoading(false)
    })
  },[dispatch, form, user]);

  useEffect(() => {
    const newForm = tempFormDetails;
    const masterList = {
      depot: depotList,
    }
    let formItem = _.find(newForm.form_items, {name: 'depot'});
    
    const handleDepotChange = (value) => {
      form.setFieldsValue({salesOrder: ""});
      setSelectedSales(null);
      setShowSalesSection(false);
      dispatch(listSalesOrderByDepot(value))
    }  

    formItem.onChange = (e) => handleDepotChange(e);
    setTempFormDetails(updateList(newForm, masterList));
  },[dispatch,depotList,tempFormDetails, form]);

  useEffect(() => {
    if(form.getFieldValue('depot') !== undefined){
      if(salesOrderList.length === 0){
        message.warning("There's no sales orders on this selected depot");
      }else{
        const newForm = tempFormDetails;
        const masterList = {
          salesOrder: formatSOList(salesOrderList),
        }
        let formItem = _.find(newForm.form_items, {name: 'salesOrder'});

        const handleSalesChange = (value) => {
          setSelectedSales(_.find(salesOrderList, (o) => o.id === value))
        }

        formItem.onChange = (e) => handleSalesChange(e)

        setTempFormDetails(updateList(newForm, masterList));
        setShowSalesSection(true);
      }
    }
  }, [salesOrderList, tempFormDetails, form]);

  const expandedRowRender = (row) => {
    return <Table 
      columns={salesInfoHeader} 
      dataSource={formatSalesInfo(row)} 
      pagination={false} 
    />
  };

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
                {showSalesSection ? (
                  <Form.Item wrapperCol={{span: 15, offset: 4}}>
                    <Table 
                      columns={salesOrderHeader}
                      dataSource={formatSalesProduct(selectedSales)}
                      expandable={{ 
                         expandedRowRender
                      }}
                    />
                  </Form.Item>
                ) : ''}
                <FormItem item={_.last(formDetails.form_items)} />
                <Form.Item wrapperCol={{ offset: 15, span: 4 }}>
                  <Space size={16}>
                    <Button htmlType="button" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
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