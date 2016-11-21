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

  createProfileNav () {
    this.props.navigator.push({
      name: 'Camera',
    })
  }

  render () {
    const limit = 200
    console.log("CreateLocation.js this.props: ", this.props)
    return (
      <View style={styles.createForm}>
        
        <Text style={styles.createFormHeader}>Tell us about this spot</Text>
        
        <View style={styles.addressContainerAdd}>
          <Image
              style={{width: 40, height: 40, marginRight: 15}}
              source={require('../Public/addressicon.png')}
            />
          <Text style={styles.createFormAddress}>{this.props.address}</Text>
        </View>

        <View style={styles.createBarContainer}>
          <TextInput
            style={styles.createSpotBar}
            maxLength={limit}
            onChange={(event) => this.setState({description: event.nativeEvent.text})}
            placeholder={'Your thoughts go here...'}
          />
        </View>

        <Button
            onPress={this.submitLocation}
            style={styles.reviewsButton}
            textStyle={styles.reviewButtonText} 
          >Submit
        </Button>

        <TouchableOpacity onPress={ () => this.createProfileNav() } 
          style={styles.createPicBtnContainer}>
          <Image
          style={{width: 40, height: 30}}
          source={require('../Public/camera-icon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}
