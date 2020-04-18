/**
 * Web App
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ModalContainer} from 'react-router-modal';

import BottomNav from './BottomNav';
import Navigator from './RouteWrapper/Navigator';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {Navigator}
        <BottomNav />
        <ModalContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw',
  },
});

export default App;
