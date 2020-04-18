import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withRouter} from 'react-router-dom';

const BottomNav = ({history}) => {
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.tab} onPress={() => history.push('/')}>
        <Image source={require('../icons/1.png')} style={styles.icon} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => history.push('/user')}>
        <Image source={require('../icons/2.png')} style={styles.icon} />
        <Text>User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  tab: {
    alignItems: 'center',
  },

  icon: {
    width: 90,
    height: 90,
  },
});

export default withRouter(BottomNav);
