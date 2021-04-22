import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Tabs, Typography, Skeleton, Empty } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';

import { listCompany, setCompany } from '../../redux/company';
import { routes } from '../../navigation/sales';

const { TabPane } = Tabs;
const { Title } = Typography;

const Sales = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true);
  const [moduleRoutes, setModuleRoutes] = useState([]);

  const companies = useSelector((state) => state.company.companyList);
  const selectedCompany = useSelector((state) => state.company.selectedCompany);
  const { permissions } = useSelector((state) => state.auth);

  const getPermittedRoutes = useCallback(() => {
    const routeList = [];
    routes.forEach((route) => {
      if (typeof permissions[route.path.split('/')[1]] !== 'undefined' && (permissions[route.path.split('/')[1]]?.actions ?? "").search('r') !== -1) {
        routeList.push(route);
      }
    });
    return routeList;
  }, [permissions]);

  useEffect(() => {
    dispatch(listCompany()).then(() => {
      setModuleRoutes(getPermittedRoutes());
      setContentLoading(false);
    });
  }, [dispatch, getPermittedRoutes]);

  const handleChangeTab = (id) => {
    dispatch(setCompany(id));
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Container location={{ pathname: path }}>
          <Row>
            <Title level={3}>Sales</Title>
          </Row>

          {contentLoading ? (
            Skeleton
          ) : (
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey={selectedCompany} onChange={handleChangeTab}>
                  {companies.map((val) => (
                    <TabPane tab={val.name} key={val.id}>
                      <ModulesGrid company={val.name} modules={moduleRoutes} />
                    </TabPane>
                  ))}
                </Tabs>
                {moduleRoutes.length === 0 && (
                  <Empty
                    style={{ width: '87.5%' }}
                    description="You do not have the permission to access this module."
                  />
                )}
              </Col>
            </Row>
          )}
        </Container>
      </Route>
      {moduleRoutes.map((module) => {
        const actions = [];
        if (permissions[module.path.split('/')[1]].actions.search('u') !== -1) {
          actions.push('update');
        }
        if (permissions[module.path.split('/')[1]].actions.search('c') !== -1) {
          actions.push('create');
        }
        if (permissions[module.path.split('/')[1]].actions.search('d') !== -1) {
          actions.push('delete');
        }
        return (
          <Route key={module.title} path={path + module.path}>
            <Container location={{ pathname: path + module.path }}>
              <module.component title={module.title} company={selectedCompany} actions={actions} />
            </Container>
          </Route>
        );
      })}
    </Switch>
  );
};

export default Sales;
