const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet, Text } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken:'',
      userObj: '',
      pageLoading: true
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
        userToken: userKey,
        pageLoading: false
      })
      } else {
        this.setState({
          pageLoading: false
        })
      }  
      console.log('user key ?', this.state.userToken)
    })
  }

  render () {
    if(this.state.pageLoading) {
      return (
      <View style={styles.container}>
          <Text> Loading... </Text>
        </View>
      )  
    }
    
   else if(this.state.userToken && !this.state.pageLoading) {
      return (
        <View style={styles.container}>
          <HomeMap currentUser={this.state.userObj} userToken={this.state.userToken} />
        </View>
      )
    } else if (!this.state.pageLoading) {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <LoginPage setUser={this.setUser.bind(this)}/>
        </View>
      )
    }
  }
}
