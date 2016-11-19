import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

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

  let stars = []
      
  for ( let i = 1; i <= rating; i++) {
    stars.push(1)
  }

  if (rating % 1 > 0) {
    let fractn = (rating % 1).toFixed(2) * 1
    stars.push(fractn)
  }

  const starWidth = 25

  return (
<<<<<<< HEAD
    <View style={styles.calloutContainer}>
      <View style={styles.calloutFavorite}>
        <TouchableOpacity onPress={ () => handleFavoriteButtonPress()}>
          <View style={{width: 30}}>
            <Icon name="heart" size={30} color="red" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.calloutDescription}>
        <Text>{title}</Text>
        <Text>Rating: {rating} / 5</Text>
        <View style={{flexDirection: 'row', width: starWidth * stars.length}}>
            {stars.map((star, key) => (
              <View style={{width: starWidth * star, flex: 1}} key={key}>
                <Icon name="star" size={starWidth} color="#ffa500" />
              </View>
            ))}
          </View>
      </View>
      <View style={styles.calloutParkingDetails}>
        <TouchableOpacity onPress={() => handleDetailsButtonPress()}>
          <View style={{width: 30}}>
            <Icon name="chevron-thin-right" size={30} color="#d7d7d7" />
          </View>
        </TouchableOpacity>
      </View> 
    </View>
=======
   <View style={styles.calloutContainer}>
     <Text style={styles.calloutDescription}>{title}</Text>
     <Text style={styles.calloutDescription}>{rating}</Text>
     <TouchableOpacity onPress={ () => handleButtonPress() } style={styles.parkingDetailsButton}>
       <Image
       style={{width: 40, height: 20}}
       source={require('../Public/Arrow-Icon.png')}
       />
     </TouchableOpacity>
   </View>
>>>>>>> adds rating to the view
  )
}