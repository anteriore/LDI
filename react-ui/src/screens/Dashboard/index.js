import React, { useState } from 'react';
import { Row, Col, Tabs, Typography } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';
import { modules } from '../../navigation/dashboard';

const { TabPane } = Tabs;
const { Title } = Typography;

const Dashboard = () => {
  const { path } = useRouteMatch();
  const [company, setCompany] = useState(1);

  const renderRoutes = () => {
    const routes = [];

    modules.forEach((module) => {
      const ComponentTag = module.component;
      routes.push(
        <Route path={path + module.path}>
          <Container location={{ pathname: path + module.path }}>
            <ComponentTag title={modules.title} company={company} />
          </Container>
        </Route>
      );
    });

    return routes;
  };

  const handleTabChange = (key) => {
    setCompany(key);
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Container location={{ pathname: path }}>
          <Row>
            <Title level={3}>Dashboard</Title>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane tab="Lakpue Drug Inc." key="1">
                  <ModulesGrid modules={modules} />
                </TabPane>
                <TabPane tab="La Croesus Pharma Inc." key="2">
                  <ModulesGrid modules={modules} />
                </TabPane>
                <TabPane tab="Fanfreluche Enterprises Inc." key="3">
                  <ModulesGrid modules={modules} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Route>
      {renderRoutes()}
    </Switch>
  );
};

export default Dashboard;
