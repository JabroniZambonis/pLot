import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'

export default class CreateLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      address: 'fetching address...'
    }
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

  submitLocation (location) {
    fetch('http://localhost:3000/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: location
      })
    })
  }

  render () {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {this.props.addLocation(); this.setModalVisible(!this.state.modalVisible); this.getAddressByCoords(this.props.currentLocation.latitude, this.props.currentLocation.longitude)}}
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
              <TextInput style={{height: 30, width: 300, borderColor: '#d7d7d7', borderWidth: 1}}>
              </TextInput>
              <TouchableHighlight>
                <Text onPress={this.submitLocation}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text style={styles.createFormClose}>close</Text>
              </TouchableHighlight>
              
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    textAlign: 'center',
    backgroundColor: '#d7d7d7',
    lineHeight: 50,
    height: 50,
  },
  createForm: {
    backgroundColor: '#fff',
    height: 200
  },
  createFormHeader: {
    textAlign: 'center',
    fontSize: 20
  },
  createFormClose: {
    textAlign: 'center'
  }
})