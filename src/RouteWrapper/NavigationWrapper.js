/// Web路由导航Action
import React from 'react';

const NavigationWrapper = ({routeMap, element, history, match, closeModal}) => {
  // 跳转
  const navigate = (toScene, params) => {
    const {navigationOptions} = routeMap[toScene];
    const isRouteModal = navigationOptions.modal;
    let routePath = navigationOptions.path;
    // 将:param? 替换成对应参数
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach((param) => {
        const re = RegExp(`:${param}\\??`);
        routePath = routePath.replace(re, escape(params[param]));
      });
    }
    //从url中删除空参数 : 和 ? 之间的每个字符串都带有实际值
    routePath = routePath.replace(/\/:(.*?)(?=\/|$)/g, '');
    if (!isRouteModal) {
      history.push(routePath);
    } else {
      // 检查网址是否以斜杠结尾
      const slash = /\/$/.test(match.url) ? '' : '/';
      // 浏览器中的当前网址+斜杠+带有参数的模式网址
      routePath = match.url + slash + routePath;
      // 从网址中删除*
      routePath = routePath.replace(/\*\/?/g, '');
      history.push(routePath);
    }
  };

  // 获取参数
  const getParam = (param, alternative) => {
    return match.params[param] || alternative;
  };

  // 返回
  const goBack = () => {
    history.goBack();
  };

  return React.cloneElement(element, {
    navigation: {navigate, getParam, goBack},
    closeModal,
  });
};

export default NavigationWrapper;
