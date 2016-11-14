import React from 'react'
import { View, Image } from 'react-native'

const LocationMarker = () => (
  <View>
    <Image
      style={{width: 30, height: 40}}
      source={require('../Public/existingPins.png')}
    />
  </View>
)

export default LocationMarker