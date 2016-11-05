import React, { Component } from 'react'
import { View, StyleSheet, MapView, TextInput } from 'react-native'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLocation: {
        latitude: 30.26,
        longitude: -97.74,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      pins: [
        {
          latitude: 30.26,
          longitude: -97.74,
          title: 'Cool Parking',
          subtitle: '123 Jabroni Street'
        },
        {
          latitude: 30.27,
          longitude: -97.75,
          title: 'Cool Parking',
          subtitle: '456 Zamboni Ave'
        }
      ],
      searchText: 'Search for spots...'
    }
  }

  componentDidMount () {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  render () {
    return (
      <View>
        <TextInput
          style={{height: 30, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.searchText}
        />
        <MapView
          region={this.state.currentLocation}
          annotations={this.state.pins}
          style={{height: 500, width: 300}}
          showsUserLocation={true}
        />
      </View>
    )
  }
}
