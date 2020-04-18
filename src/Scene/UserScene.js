import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserScene = ({navigation}) => {
  /**
   * 打开Modal
   * @memberof HomeScene
   */
  const openModal = () => {
    navigation.navigate('Modal', {name: 'Codeing!', age: 123});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>用户页面</Text>
      <Text style={styles.welcome} onPress={openModal}>
        打开Modal
      </Text>
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
    margin: 30,
  },
});

export default UserScene;
