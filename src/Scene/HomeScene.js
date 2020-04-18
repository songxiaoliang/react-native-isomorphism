import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

export default class HomeScene extends Component {
  /**
   * 跳转到Happy
   * @memberof HomeScene
   */
  goHappy = () => {
    const {navigation} = this.props;
    navigation.navigate('Happy', {name: 'Codeing!'});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>首页</Text>
        <Text onPress={this.goHappy}>跳转到Happy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});
