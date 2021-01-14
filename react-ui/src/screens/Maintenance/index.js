import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Typography, Skeleton } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes as MaintenanceRoutes } from '../../navigation/maintenance';
import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';
import { listCompany, setCompany } from '../../redux/company';

const { TabPane } = Tabs;
const { Title } = Typography;

const Maintenance = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setContentLoading(false);
    });
  }, [dispatch]);

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
  };

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Container location={{ pathname: path }}>
            <Row>
              <Title level={3}>Maintenance</Title>
            </Row>
            {contentLoading ? (
              <Skeleton />
            ) : (
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                    {companies.map((val) => (
                      <TabPane tab={val.name} key={val.id}>
                        <ModulesGrid company={val.name} modules={MaintenanceRoutes} />
                      </TabPane>
                    ))}
                  </Tabs>
                </Col>
              </Row>
            )}
          </Container>
        </Route>
        {MaintenanceRoutes.map((module) => (
          <Route path={path + module.path}>
            <Container location={{ pathname: path + module.path }}>
              <module.component title={module.title} company={selectedCompany} />
            </Container>
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default Maintenance;
