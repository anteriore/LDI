import React from 'react';
import { Row, Col, Tabs, Typography } from 'antd';

const { Title } = Typography;

const ApprovedReceipts = (props) => {

    return (
        <div>
            <Row><Title level={3}>{props.title}</Title></Row>
            <Row>*Table here*</Row>    
        </div>
    )
}

export default ApprovedReceipts