import React, { Component } from 'react'
import { View, StyleSheet, MapView } from 'react-native'

export default class HomeMap extends Component {
  render () {
    return (
      <View>
        <MapView
          style={{height: 200, width: 200}}
          showsUserLocation={true}
        />
      </View>
    )
  }
}
