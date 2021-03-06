const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import React, { Component } from 'react'
import {
  View  
} from 'react-native'
import serverURL from '../Lib/url'
      
export default class FBlogin extends Component {

  constructor(props) {
    super(props)
  }

  finishedLogin (error, result) {
    if (error) {
      alert('Login failed with error: ' + error);
    } else if (result.isCancelled) {
      alert('Login was cancelleed')
    } else {
      this.props.reanimator()
      AccessToken.getCurrentAccessToken()
        .then( (data) => {
          fetch(`${serverURL}/auth`, {
            method: 'POST',
            headers:{
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fbAccessToken: data.accessToken
            })
        })
        .then( (response) => response.json())
        .then( (data) => {
          this.props.setUser(data)
        })
        .catch( (err) => {
          console.log(err)
        })
      })
  }
}
  finishedLogout (error, result) {
    this.props.logOut()
  }
 

  render() {
      console.log('this is the passed user state:',this.props.loggedIn)
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile email"]}
          onLoginFinished={this.finishedLogin.bind(this)}
          onLogoutFinished={this.finishedLogout.bind(this)}/>
      </View>
    );
  }
};
