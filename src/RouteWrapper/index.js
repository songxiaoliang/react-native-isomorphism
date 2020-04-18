/// 为了将路由操作同步化, 针对web端进行特殊处理, 使其操作方式与react-navigation类似
import React from 'react';
import {Route} from 'react-router-dom';
import {ModalRoute} from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

import NavigationWrapper from './NavigationWrapper';

// route的hoc实现
const RouteWrapper = ({routeMap}) => {
  // 遍历routeMap, 生成对应的Route
  return Object.keys(routeMap).map((routeName) => {
    // 路由
    const currentRoute = routeMap[routeName];
    // 界面
    const Screen = currentRoute.screen;
    // 配置参数
    const {navigationOptions} = currentRoute;
    const routePath = navigationOptions.path;
    const exact = navigationOptions.exact;
    const isModalRoute = navigationOptions.modal;

    return isModalRoute ? (
      <ModalRoute
        key={routePath}
        path={routePath}
        component={(props) => (
          <NavigationWrapper
            element={<Screen />}
            {...props}
            routeMap={routeMap}
          />
        )}
      />
    ) : (
      <Route
        key={routePath}
        path={routePath}
        exact={exact}
        render={(props) => (
          <NavigationWrapper
            element={<Screen />}
            {...props}
            routeMap={routeMap}
          />
        )}
      />
    );
  });
};

export default RouteWrapper;
