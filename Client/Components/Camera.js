const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Camera } from 'react-native-camera'
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableHighlight, } from 'react-native'

export default class Cam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameraType: Camera.constants.Type.back
    }

    this.takePicture = this.takePicture.bind(this)
  }

  takePicture() {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
    });
  }

  render () {
    return (
      <Camera
        ref="cam"
        style={styles.cameraContainer}
        type={this.state.cameraType}>
        <View style={styles.cameraButtonBar}>
          <TouchableHighlight style={styles.cameraButton} onPress={this.takePicture}>
            <Text style={styles.cameraButtonText}>Take</Text>
          </TouchableHighlight>
        </View>
      </Camera>
    )
  }
}
