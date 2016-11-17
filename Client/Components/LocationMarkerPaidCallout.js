import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default LocationMarkerPaidCallout = ( { description, navigator, key, coordinate, title, id, reviews, currentUser, price }) => {

  const handleButtonPress = () => {
    navigator.push({
      name: 'ParkingDetails',
      description,
      id,
      coordinate,
      title,
      reviews,
      currentUser,
      price
    })
  }

  return (
   <View style={styles.calloutContainer}>
     <Text style={styles.calloutDescription}>{price} {title}</Text>
     <TouchableOpacity onPress={ () => handleButtonPress() } style={styles.parkingDetailsButton}>
       <Image
       style={{width: 40, height: 20}}
       source={require('../Public/Arrow-Icon.png')}
       />
     </TouchableOpacity>
   </View>
  )
}