import React from 'react';
import { Col, Card } from 'antd';
import { 
    ProfileOutlined
} from '@ant-design/icons';
import { Link} from 'react-router-dom';

const { Meta } = Card;

const Modules = (props) => {
    
    return (
        <Col span={styles.span}>
            <Card bordered={true} style={styles.Card}>
                <Link to={props.path} >
                    <ProfileOutlined style={styles.CardIcon}/>
                    <Meta title={props.title}/>
                </Link>
            </Card>
        </Col>
    )
}

export default Modules

const styles = {
    Card: {
        backgroundColor: "#f3f3f3",
        borderColor: "#999999",
    },

    CardIcon: {
        fontSize:'32px'
    },
    
    span: 5,

}