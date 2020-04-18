/* eslint-disable react-native/no-inline-styles */
/// App导航路由栈
import React from 'react';
import {Image} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import HomeScene from '../src/Scene/HomeScene';
import UserScene from '../src/Scene/UserScene';
import HappyScene from '../src/Scene/HappyScene';
import ModalScene from '../src/Scene/ModalScene';

const HomeTab = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScene,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: (
          <Image
            style={{width: 80, height: 80}}
            source={require('../App/icons/1.png')}
          />
        ),
      },
    },
    User: {
      screen: UserScene,
      navigationOptions: {
        title: 'User',
        tabBarIcon: (
          <Image
            style={{width: 100, height: 100}}
            source={require('../App/icons/2.png')}
          />
        ),
      },
    },
  },
  {
    headerMode: 'none',
    tabBarOptions: {
      showLabel: 'true',
      showIcon: 'true',
      adaptive: false,
      activeTintColor: 'red',
    },
    lazy: true,
  },
);

const HappyNavigator = createStackNavigator({
  Happy: {screen: HappyScene, navigationOptions: {header: null}},
});

const AppNavigator = createStackNavigator(
  {
    HomeTab: HomeTab,
    Happy: HappyNavigator,
    Modal: ModalScene,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
