const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'

export default class CreateLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      description: '',
      address: 'fetching address...'
    }
    this.setModalVisible = this.setModalVisible.bind(this)
    this.submitLocation = this.submitLocation.bind(this)
    this.getAddressByCoords = this.getAddressByCoords.bind(this)
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  getAddressByCoords (lat, long) {
    fetch(`http://localhost:3000/locations/googlebycoords?lat=${lat}&long=${long}`)
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

    fetch('http://localhost:3000/locations', {
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
    .then(this.setModalVisible(!this.state.modalVisible))
  }

  render () {
    const limit = 200
    let remainder = limit - this.state.description.length
    let remainderColor = remainder > 20 ? 'green' : 'red'

    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.props.addLocation();
            this.setModalVisible(!this.state.modalVisible);
            this.getAddressByCoords(this.props.currentLocation.latitude, this.props.currentLocation.longitude)
          }}
        >
          <Text style={styles.buttonStyle}>Add</Text>
        </TouchableHighlight>


        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
        >
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
        </Modal>
      </View>
    )
  }
}
