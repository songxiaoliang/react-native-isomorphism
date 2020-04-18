import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ModalScene extends Component {
  goBack = () => {
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Modal, {navigation.getParam('age', 'React')}
        </Text>
        <Text style={styles.welcome} onPress={this.goBack}>
          返回上一页
        </Text>
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
    margin: 10,
  },
});
