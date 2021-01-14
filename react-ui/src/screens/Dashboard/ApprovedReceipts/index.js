import React from 'react';
import { Row, Typography } from 'antd';

const { Title } = Typography;

const ApprovedReceipts = (props) => {
  const { title } = props;
  return (
    <div>
      <Row>
        <Title level={3}>{title}</Title>
      </Row>
      <Row>*Table here*</Row>
    </div>
  );
};

export default ApprovedReceipts;
