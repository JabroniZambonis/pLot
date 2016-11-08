import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import HomeMap from './HomeMap'
import LoginPage from './LoginPage'




export default class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      userToken: {},
      userObj: {}
    }
  }

  setUser (userInfo) {
    this.setState({userToken: userInfo.accessToken, userObj: userInfo.user})
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