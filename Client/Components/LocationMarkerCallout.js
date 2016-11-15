import React from 'react'
import { View, Text } from 'react-native'

export default LocationMarkerCallout = ( { description }) => {
  return (
   <View>
     <Text>{description}</Text>
   </View>
  )
}