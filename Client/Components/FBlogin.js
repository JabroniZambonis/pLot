const styles = require('../Style/style.js')

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import React, { Component } from 'react'
import {
  View
} from 'react-native'

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
      AccessToken.getCurrentAccessToken()
        .then( (data) => {
          fetch('http://localhost:3000/auth', {
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

  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile email"]}
          onLoginFinished={this.finishedLogin.bind(this)}
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};
