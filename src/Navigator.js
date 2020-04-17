// web页面路由导航栈
import HomeScene from '../src/Scene/HomeScene';
import UserScene from '../src/Scene/UserScene';
import HappyScene from '../src/Scene/HappyScene';

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
      path: '/user',
      exact: true,
    },
  },
  Happy: {
    screen: HappyScene,
    navigationOptions: {
      path: '/happy',
      exact: true,
    },
  },
};

export default WebRoutesGenerator({routeMap});
