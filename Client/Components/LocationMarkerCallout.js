import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

export default LocationMarkerCallout = ( { description, navigator, key, coordinate, title, id, reviews, currentUser, rating, userToken }) => {

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

  const handleFavoriteButtonPress = function () {
    fetch(`http://localhost:3000/users/${currentUser._id}/saved`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
      body: JSON.stringify({
        location: id
      })
    })
    .then(response => response.json())
    .then(console.log)
    .catch(err => {
      console.log(err)
    })
  }


  return (
   <View style={styles.calloutContainer}>
     <Text style={styles.calloutDescription}>{title}</Text>
     <Text style={styles.calloutDescription}>{rating}</Text>
<<<<<<< HEAD
     <TouchableOpacity onPress={ () => handleDetailsButtonPress() } style={styles.parkingDetailsButton}>
=======
     <TouchableOpacity onPress={ () => handleButtonPress() } style={styles.parkingDetailsButton}>
>>>>>>> adds rating to the view
       <Image
       style={{width: 40, height: 20}}
       source={require('../Public/Arrow-Icon.png')}
       />
     </TouchableOpacity>
     <TouchableOpacity onPress={ () => handleFavoriteButtonPress()}>
       <Text>Add to Favorites</Text>
     </TouchableOpacity>
   </View>
  )
}