import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HappyScene = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>快乐玩耍页面</Text>
    </View>
  );
};

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

export default HappyScene;
