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
          console.log('Access Token: ', data.accessToken)
          return fetch('/auth', {
            method: 'POST',
            body: data.accessToken
          })
        .then( res => {
          console.log('RES? ', res)
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


// console.log('Access Token: ', data.accessToken)
//          return fetch('/auth', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               'fbAccessToken': data.accessToken
//             })
//           })
//          .then( (data) => {
//           console.log('JWT REs', data)
//         })
