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
  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Login failed with error: " + error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                // alert("Login was successful with permissions: " + result.grantedPermissions)
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log("Access Token:", data.accessToken)
                  })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};
