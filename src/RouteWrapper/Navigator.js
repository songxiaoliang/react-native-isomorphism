// web页面路由导航栈

import WebRoutesGenerator from './index';

import HomeScene from '../Scene/HomeScene';
import UserScene from '../Scene/UserScene';
import HappyScene from '../Scene/HappyScene';
import ModalScene from '../Scene/ModalScene';

const routeMap = {
  Home: {
    screen: HomeScene,
    navigationOptions: {
      path: '/',
      exact: true,
    },
  },
  User: {
    screen: UserScene,
    navigationOptions: {
      path: '/user/:name?',
      exact: true,
    },
  },
  Happy: {
    screen: HappyScene,
    navigationOptions: {
      path: '/happy/:name?',
      exact: true,
    },
  },
  Modal: {
    screen: ModalScene,
    navigationOptions: {
      path: '*/modal/:name?/:age?',
      modal: true,
    },
  },
};

export default WebRoutesGenerator({routeMap});
