const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'
import FBlogin from './FBlogin'

export default class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pressStatus: false
    }

    this.onDisplayUnderlay = this.onDisplayUnderlay.bind(this)
  }

  onDisplayUnderlay(){
    console.log("onDisplayUnderlay got hit")
    if (this.state.pressStatus === true) {
      this.setState({ pressStatus: false })
    } else {
      this.setState({ pressStatus: true })
    }
  }

  finishedLogout (error, result) {
    this.props.logOut()
  }

  render () {
    return (
      <View>
        <TouchableHighlight
          onPress={this.onDisplayUnderlay}
        >
          <Image
            style={styles.profileViewImageButton}
            source={{uri: this.props.currentUser.photo}}
          />
        </TouchableHighlight>

        <View style={ this.state.pressStatus ? styles.profileViewView1 : styles.profileViewView2 } >
          <TouchableHighlight 
            onPress={this.onDisplayUnderlay}
          >
            <Text>X</Text>
          </TouchableHighlight>
          <FBlogin logOut={this.props.logOut} reanimator={this.props.reanimator}/>
        </View>
      </View>
    )
  }
}
