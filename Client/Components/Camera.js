const styles = require('../Style/style.js')
import React, { Component } from 'react'
import Camera from 'react-native-camera'
import { Text, TouchableHighlight, View } from 'react-native'

export default class Cam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cameraType: Camera.constants.Type.back
    }
    this.takePicture = this.takePicture.bind(this)
  }

  takePicture() {
    this.camera.capture()
      .then(photo => {
        this.props.addPhoto(photo)
      })
      .catch(err => {
        console.error("ERROR Camera.js takePicture failed: ", err)
      })

    this.props.navigator.pop()
  }

  render () {
    return (
      <Camera
        ref={(cam) => this.camera = cam}
        aspect={Camera.constants.Aspect.fill}
        style={styles.cameraContainer}
        type={this.state.cameraType}>
        <View style={styles.cameraButtonBar}>
          <TouchableHighlight style={styles.cameraButton}>
            <Text style={styles.cameraButtonText} onPress={this.takePicture}>Take</Text>
          </TouchableHighlight>
        </View>
      </Camera>
    )
  }
}