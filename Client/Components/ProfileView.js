const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, Image } from 'react-native'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    // console.log("ProfileView.js this.props: ", this.props.currentUser.photo)
    return (
      <View>
        <Image
          style={styles.profileImageButton}
          source={{uri: this.props.currentUser.photo}}
        />
      </View>
    )
  }
}
