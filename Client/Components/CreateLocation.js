const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableHighlight, TouchableOpacity, Text, StyleSheet, View, Modal, TextInput } from 'react-native'
import Button from 'apsl-react-native-button'
import serverURL from '../Lib/url'
import { getAddressByCoords } from '../Lib/HomeMapHelperFns'

export default class CreateLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      address: 'Error fetching address...',
      createdAddressId: null,
      currentPhoto: {}
    }

    this.submitLocation = this.submitLocation.bind(this)
    this.getAddressByCoords = this.getAddressByCoords.bind(this)
    this.addPhoto = this.addPhoto.bind(this)
  }

  componentDidMount () {
    // get the address for this location coords
    const { latitude, longitude } = this.props.currentLocation
    // set state for address
    this.getAddressByCoords(latitude, longitude)
      .catch(err => this.setState({ address: 'Error fetching address'}))
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
    // location saved addLocation to UI
    .then(response => response.json())
    .then(response => {
      const location = {
        address: this.state.address,
        description: this.state.description,
        lat: this.props.currentLocation.latitude,
        long: this.props.currentLocation.longitude
      }
      this.props.addLocation(location)
      this.setState({createdAddressId: location.op._id})
    })
    .then(() => {

      fetch(`${serverURL}/locations/${this.props.locationId}/photos`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.props.userToken
          },
          body: JSON.stringify({
            image: this.state.currentPhoto 
          })
        })
        .then(response => response.json())
        // any errors posting the location
        // This needs improvement!
        .catch(err => console.log(err))

    })
    .catch(err => console.log(err))
  }

  createProfileNav () {
    this.props.navigator.push({
      name: 'Camera',
      addphoto: this.addPhoto,
    })
  }


  addPhoto (photo) {
    this.setState({currentPhoto: photo})
  }

  render () {
    const limit = 200
    console.log("CreateLocation.js this.props: ", this.props)

    return (
      <View style={styles.createForm}>

        <Text style={styles.createFormHeader}>Drop a pin and share your spot</Text>

        <View style={styles.addressContainerAdd}>
          <Image
              style={{width: 40, height: 40, marginRight: 15}}
              source={require('../Public/addressicon.png')}
            />
          <Text style={styles.createFormAddress}>{this.state.address}</Text>
        </View>

        <TouchableOpacity onPress={ () => this.createProfileNav() }
          style={styles.createPicBtnContainer}>
          <Text style={{fontSize:20, color: '#999999', fontWeight:'bold'}}>+ </Text>
          <Image
          style={{width: 40, height: 30}}
          source={require('../Public/camera-icon.png')}
          />
        </TouchableOpacity>

        <View style={styles.createBarContainer}>
          <TextInput
            multiline={true}
            style={styles.createSpotBar}
            maxLength={limit}
            onChange={(event) => this.setState({description: event.nativeEvent.text})}
            placeholder={'Tell us about the spot...'}
          />
          <View>
            <Button
              onPress={this.submitLocation}
              style={submitButtonStyle}
              textStyle={styles.reviewButtonText}
              activeOpacity={1} 
              onPressIn={() => this.setButtonStyle(!this.state.buttonPress)}
              onPressOut={() => this.setButtonStyle(!this.state.buttonPress)}
            >Submit
            </Button>
          </View>
        </View>
      </View>
    )
  }
}
