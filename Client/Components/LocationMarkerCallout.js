import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

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
   <View style={styles.calloutContainer}>
     <Text style={styles.calloutDescription}>{title}</Text>
     <TouchableOpacity onPress={ () => handleButtonPress() } style={styles.parkingDetailsButton}>
       <Image
       style={{width: 40, height: 20}}
       source={require('../Public/Arrow-Icon.png')}
       />
     </TouchableOpacity>
   </View>
  )
}