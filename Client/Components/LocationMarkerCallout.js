import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default LocationMarkerCallout = ( { description, navigator, key, coordinate, title, id, reviews, currentUser, rating }) => {

  const handleDetailsButtonPress = () => {
    navigator.push({
      name: 'ParkingDetails',
      description,
      id,
      coordinate,
      title,
      reviews,
      rating,
      currentUser
    })
  }

  const handleFavoriteButtonPress = function (id) {
    fetch(`http://localhost:3000/users/${currentUser._id}/saved`), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: id
      })
    })
  }


  return (
   <View style={styles.calloutContainer}>
     <Text style={styles.calloutDescription}>{title}</Text>
     <Text style={styles.calloutDescription}>{rating}</Text>
     <TouchableOpacity onPress={ () => handleDetailsButtonPress() } style={styles.parkingDetailsButton}>
       <Image
       style={{width: 40, height: 20}}
       source={require('../Public/Arrow-Icon.png')}
       />
     </TouchableOpacity>
   </View>
  )
}