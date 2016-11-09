const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken:'',
      userObj: ''
    }
  }

  setUser (userInfo) {
    this.setState({
      userToken: userInfo.accessToken,
      userObj: userInfo.user
      })
    AsyncStorage.setItem('pLotLoginKey',userInfo.accessToken)
    console.log('this is the state after Set User', this.state)
  }

  render () {
    return (
      <View style={styles.container}>
        <HomeMap />
       <LoginPage setUser={this.setUser.bind(this)}/>
      </View>
    )
  }
}
