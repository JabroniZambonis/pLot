import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import LocationListItem from './LocationListItem'

export default class LocationListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nearbyLocations: this.props.nearbyLocations,
      modalVisible: false
    }
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  render () {
    return (
      <View>
        <Modal>
          <TouchableHighlight
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <Text>Show Map</Text>
          </TouchableHighlight>

          {this.state.nearbyLocations.map((location) => (
            <LocationListItem location={location}/>
          ))}
          
        </Modal>
      </View>
    )
  }
}

loca.coordinate = {
    latitude: location.loc[1],
    longitude: location.loc[0]
  }
loca.title = location.address
loca.description = location.description
    