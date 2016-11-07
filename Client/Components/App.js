import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <HomeMap />
        <LoginPage />
      </View>
    )
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});