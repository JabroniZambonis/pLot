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
      .then(data => {
        fetch(`${serverURL}/locations/${this.props.locationId}/photos`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.props.userToken
          },
          body: JSON.stringify({
            location: 
          })
        })
        .then(response => response.json())
        // any errors posting the location
        // This needs improvement!
        .catch(err => console.log(err))
      })
      .catch(err => {
        console.error("ERROR Camera.js takePicture failed: ", err)
      })
    }
  }
  
  render () {
    return (
      <Camera
        ref="cam"
        style={styles.cameraContainer}
        type={this.state.cameraType}>
        <View style={styles.cameraButtonBar}>
          <TouchableHighlight style={styles.cameraButton}>
            <Text style={styles.cameraButtonText}>Take</Text>
          </TouchableHighlight>
        </View>
      </Camera>
    )
  }
}