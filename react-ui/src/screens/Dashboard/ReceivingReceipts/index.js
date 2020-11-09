import React from 'react';
import { Row, Typography } from 'antd';

const { Title } = Typography;

const ReceivingReceipts = (props) => {
    return (
        <div>
            <Row><Title level={3}>{props.title}</Title></Row>
            <Row>*Table here*</Row>
        </div>
    )
}

export default ReceivingReceipts