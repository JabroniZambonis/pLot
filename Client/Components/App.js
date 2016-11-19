const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { AsyncStorage, Navigator, StyleSheet, Text, View } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'
import LoadingPage from './LoadingPage'
import FBlogin from './FBlogin'
import Router from './Router'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken:'',
      userObj: {},
      animating: true,
      initialRoute: 'HomeMap',
      fbAccessToken: ''
    }
  }

  setUser (userInfo) {
    this.setState({
      userToken: userInfo.accessToken,
      userObj: userInfo.user,
      animating: false,
      fbAccessToken: userInfo.fbAccessToken
    })
    // set the accessToken into local storage
    AsyncStorage.setItem('pLotLoginKey',userInfo.accessToken)
    AsyncStorage.setItem('fbAccessToken',userInfo.fbAccessToken)
  } 

  logOut () {
    AsyncStorage.removeItem('pLotLoginKey')
    AsyncStorage.removeItem('fbAccessToken')
    .then(removed => {
      this.setState({
        userToken: '',
        userObj: {},
        fbAccessToken: '',  
      })
    })
  }

  reanimator () {
    this.setState({
      animating: true
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('fbAccessToken')
    .then( (data) => {
      console.log('fb token here',data)
    })
    AsyncStorage.getItem('pLotLoginKey')
    .then( (userKey) => {
      if(userKey) {
        this.setState({
        userToken: userKey,
        animating: false
      })
      } else {
        this.setState({
          animating: false
        })
      }
    })
  }

  render () {
    //test
    if (this.state.animating) {
      return (
      <LoadingPage
            animating={this.state.animating}/>
      )
    } else if (this.state.userToken && !this.state.animating) {
      return (
        <View style={styles.container}>
          <Router currentUser={this.state.userObj} userToken={this.state.userToken} logOut={this.logOut.bind(this)} reanimator={this.reanimator.bind(this)}/>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <LoginPage logOut={this.logOut.bind(this)} setUser={this.setUser.bind(this)} reanimator={this.reanimator.bind(this)}/>
        </View>
      )
    }
  }
}
