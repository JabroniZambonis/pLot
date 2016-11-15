import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

export default LocationMarkerCallout = ( { description, navigator, key, coordinate, title, id }) => {

  const handleButtonPress = () => {
    navigator.push({
      name: 'ParkingDetails',
      description,
      id,
      coordinate,
      title
    })
  }

  return (
   <View>
     <Text>{description}</Text>
     <TouchableHighlight onPress={ () => handleButtonPress() }>
       <Text>Parking Details</Text>
     </TouchableHighlight>
   </View>
  )
}