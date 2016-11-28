import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import styles  from '../Style/style.js'
import serverURL from '../Lib/url'
import Icon from 'react-native-vector-icons/Entypo'

export default FavoritesListItem = (props) => {

  const handleButtonPress = () => {
    const lat = props.location.loc[1]
    const long = props.location.loc[0]

    props.navigator.push({
      name: 'ParkingDetails',
      description: props.location.description,
      id: props.location._id,
      coordinate: {latitude: lat, longitude: long},
      title: props.location.address,
      backButtonText: 'favorites'
    });
  }

  const handleRemoveFavorites = function () {
    fetch(`${serverURL}/users/${props.currentUser._id}/saved`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': props.userToken
      },
      body: JSON.stringify({
        location: props.location._id
      })
    })
    .then(response => response.json())
    .then(json => {
      props.updateStateOfFavorites(json._id)
    })
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <View>
    <TouchableOpacity onPress={ () => {handleRemoveFavorites()}}>
      <View style={{width: 25}}>
        <Icon name="trash" size={25} color={'gray'}/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={ () => { handleButtonPress() } }
      style={styles.listItemView}
    >
      <View style={styles.listItemText}>
        <Text style={{fontWeight: 'bold'}}>{props.location.address}</Text>
        <Text>{props.location.description}</Text>
      </View>
      <Image
        style={styles.listItemArrow}
        source={require('../Public/Arrow-Icon.png')}
      />
    </TouchableOpacity>
    </View>
  )
}