import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserScene = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>用户页面</Text>
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

export default UserScene;
