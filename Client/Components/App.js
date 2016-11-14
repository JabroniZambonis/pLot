const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet, Text } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'
import LoadingPage from './LoadingPage'
import FBlogin from './FBlogin'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userToken:'',
      userObj: {},
      animating: true,
      initialRoute: 'HomeMap'
    }
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'LoadingPage':
        return <LoadingPage navigator={navigator} {...route.passProps} />
        break
      case 'LoginPage':
        return <LoadingPage navigator={navigator} {...route.passProps} />
        break
      case 'HomeMap':
        return <HomeMap navigator={navigator} {...route.passProps} />
        break
      case 'Camera':
        return <Camera navigator={navigator} {...route.passProps} />
        break
    }
  }

  setUser (userInfo) {
    this.setState({
      userToken: userInfo.accessToken,
      userObj: userInfo.user,
      animating: false
    })
    // set the accessToken into local storage
    AsyncStorage.setItem('pLotLoginKey',userInfo.accessToken)
  } 

  logOut () {
    AsyncStorage.removeItem('pLotLoginKey')
    .then(removed => {
      this.setState({
        userToken: '',
        userObj: '',
      })
    })
  }

  reanimator () {
    this.setState({
      animating: true
    })
  }

  componentDidMount() {
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
    if (this.state.animating) {
      return (
      <LoadingPage
            animating = {this.state.animating}/>
      )
    } else if (this.state.userToken && !this.state.animating) {
      return (
        <View style={styles.container}>
          <HomeMap currentUser={this.state.userObj} userToken={this.state.userToken} logOut={this.logOut.bind(this)} reanimator={this.reanimator.bind(this)}/>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <LoginPage setUser={this.setUser.bind(this)} reanimator={this.reanimator.bind(this)} />
        </View>
      )
    }
  }

  render () {
    if (this.state.animating) {this.state.initialRoute}
    return (
      <Navigator
        renderScene = { this.renderScene } />
    )
  }
}
