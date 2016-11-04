import React, { Component } from 'react'
import { View, StyleSheet, MapView } from 'react-native'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLocation: {
        latitude: 30.26,
        longitude: -97.74,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    }
  }


  render () {
    return (
      <View>
        <MapView
          region={this.state.currentLocation}
          style={{height: 200, width: 200}}
          showsUserLocation={true}
        />
      </View>
    )
  }
}
