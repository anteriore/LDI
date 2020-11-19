import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

import { login, resetErrorMsg } from '../../redux/auth';

const Login = () => {
  const error = useSelector((state) => state.auth.error);
  const { Title } = Typography;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(resetErrorMsg());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(login(values)).then((response) => {
      history.push('/');
    });
  };

  return (
    <>
      <Row>
        <Col span={2}>
          <Title level={4}>Login</Title>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <Form {...styles.layout} onFinish={onFinish}>
            <Form.Item
              {...(error && {
                hasFeedback: true,
                validateStatus: 'error',
                help: error,
              })}
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...(error && {
                hasFeedback: true,
                validateStatus: 'error',
              })}
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password' }]}
            >
              <Input.Password />
            </Form.Item>
            <div style={styles.tailLayout}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;

const styles = {
  layout: {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 4,
    },
  },
  tailLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '25%',
  },
};
