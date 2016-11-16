import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import styles  from '../Style/style.js'

const LocationListItem = (props) => {

  const handleButtonPress = () => {
    props.navigator.push({
      name: 'ParkingDetails',
      description: props.location.description,
      id: props.location.id,
      coordinate: props.location.coordinate,
      title: props.location.title
    });

  }

  return (
      <View style={styles.listItemView}>
        <Text>{props.location.title}</Text>
        <Text>{props.location.description}</Text>
        <TouchableOpacity onPress={ () => { handleButtonPress();
                                            props.setModalVisible(!props.modalState)
                                          }}
        >
           <Text>Parking Details</Text>
         </TouchableOpacity>
      </View>
  )
}

export default LocationListItem