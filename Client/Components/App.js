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
  

  componentDidMount() {
    AsyncStorage.getItem('pLotLoginKey')
    .then( (userKey) => {
      console.log('DOT THEN', userKey)
      if(userKey) {
        this.setState({
        userToken: userKey
      })
      }  
      console.log('user key ?', this.state.userToken)
    })
  }

  render () {
    
    if(this.state.userToken) {
      return (
        <View style={styles.container}>
          <HomeMap currentUser={this.state.userObj} userToken={this.state.userToken} />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <LoginPage setUser={this.setUser.bind(this)}/>
        </View>
      )
    }
  }
}
