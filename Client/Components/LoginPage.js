const styles = require('../Style/style.js')

import React, { Component } from 'react'
import {
  View,
  Text,
  Image

} from 'react-native'
import FBlogin from './FBlogin'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text style={styles.loginText}><Image style={styles.logo} source={require('../Public/parkinglogo.png')}/>Lot </Text>
        <FBlogin setUser={this.props.setUser} reanimator={this.props.reanimator} />
      </View>
    )
  }
}
