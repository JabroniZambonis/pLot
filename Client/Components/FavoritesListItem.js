import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import styles  from '../Style/style.js'

export default FavoritesListItem = (props) => {

  const handleButtonPress = () => {
    const lat = props.location.loc[1]
    const long = props.location.loc[0]

    props.navigator.push({
      name: 'ParkingDetails',
      description: props.location.description,
      id: props.location.id,
      coordinate: {latitude: lat, longitude: long},
      title: props.location.address,
      backButtonText: 'favorites'
    });
  }

  return (
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
  )
}