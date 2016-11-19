const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'
import Button from 'apsl-react-native-button'
import serverURL from '../Lib/url'

export default class CreateLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      address: 'fetching address...',
      buttonPress: false
    }

    this.setButtonStyle = this.setButtonStyle.bind(this)
    this.getAddressByCoords = this.getAddressByCoords.bind(this)
    this.submitLocation = this.submitLocation.bind(this)
  }

  getAddressByCoords (lat, long) {
    fetch(`${serverURL}/locations/googlebycoords?lat=${lat}&long=${long}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Got data: ', data)
      this.setState({address: data})
    })
    .catch((err) => {
      console.log('This did not work: ', err)
    })
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
    .then(location => {
      this.setModalVisible(!this.state.modalVisible)
    })
    // any errors posting the location
    // This needs improvement!
    .catch(err => console.log(err))
  }

  render () {
    const limit = 200
    let remainder = limit - this.state.description.length
    let remainderColor = remainder > 20 ? 'green' : 'red'
    let addButtonStyle = this.state.buttonPress ? styles.addLocationButtonContainerPress : styles.addLocationButtonContainer

    return (
      <View>

        <View style={{marginTop: 22}}>
          <View style={styles.createForm}>

            <Text style={styles.createFormHeader}>Tell us about this spot</Text>

            <Text>{this.state.address}</Text>

            <TextInput
              style={{height: 30, width: 300, borderColor: '#d7d7d7', borderWidth: 1}}
              maxLength={limit}
              onChange={(event) => this.setState({description: event.nativeEvent.text})}
              placeholder={'Your thoughts go here...'}
            />
            <Text style={{color: remainderColor}}>
              {remainder}
            </Text>

            <TouchableHighlight>
              <Text onPress={this.submitLocation}>Submit</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
                this.props.cancelLocationAdd()
              }}
            >
              <Text style={styles.createFormClose}>close</Text>
            </TouchableHighlight>

          </View>
        </View>
      </View>
    )
  }
}
