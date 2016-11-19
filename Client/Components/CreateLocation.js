const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, Modal, TextInput } from 'react-native'
import Button from 'apsl-react-native-button'
import serverURL from '../Lib/url'

export default class CreateLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      address: 'Error fetching address...',
    }

    this.submitLocation = this.submitLocation.bind(this)
  }

  submitLocation () {
    let locationObj = {}
    locationObj.address = this.state.address
    locationObj.description = this.state.description
    locationObj.loc = [this.props.currentLocation.longitude, this.props.currentLocation.latitude]

    fetch(`${serverURL}/locations`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.userToken
      },
      body: JSON.stringify({
        location: locationObj
      })
    })
    .then(response => response.json())
    // any errors posting the location
    // This needs improvement!
    .catch(err => console.log(err))
  }

  render () {
    const limit = 200
    console.log("CreateLocation.js this.props: ", this.props)
    return (
      <View style={styles.createForm}>
        
        <Text style={styles.createFormHeader}>Tell us about this spot</Text>
        

        <Text style={styles.createFormAddress}>{this.props.address}</Text>

        <View style={styles.createBarContainer}>
          <TextInput
            style={styles.createSpotBar}
            maxLength={limit}
            onChange={(event) => this.setState({description: event.nativeEvent.text})}
            placeholder={'Your thoughts go here...'}
          />
        </View>

        <TouchableHighlight style={styles.createSubmitBtnContainer}>
          <Text onPress={this.submitLocation}>Submit</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.createPicBtnContainer}>
          <Image
          style={{width: 40, height: 30}}
          source={require('../Public/camera-icon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
