const styles = require('../Style/style.js')

import React, { Component } from 'react'
import {
  View,
  Text

} from 'react-native'
import FBlogin from './FBlogin'

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text style={styles.splashText}> pLot </Text>
        <FBlogin setUser={this.props.setUser} reanimator={this.props.reanimator} />
      </View>
    )
  }
}
