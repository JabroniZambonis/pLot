import React from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, Image } from 'react-native'
import styles  from '../Style/style.js'

const LocationListItem = (props) => {

  const handleButtonPress = () => {
    props.navigator.push({
      name: 'ParkingDetails',
      description: props.location.description,
      id: props.location.id,
      coordinate: props.location.coordinate,
      title: props.location.title,
      backButtonText: 'map'
    });

  }

  return (
        <TouchableOpacity
          onPress={ () => { handleButtonPress();
                            props.setModalVisible(!props.modalState)
                          }}
          style={styles.listItemView}
        >
          <View style={styles.listItemText}>
            <Text style={{fontWeight: 'bold'}}>{props.location.title}</Text>
            <Text>{props.location.description}</Text>
          </View>
            <Image
              style={styles.listItemArrow}
              source={require('../Public/Arrow-Icon.png')}
            />
        </TouchableOpacity>
  )
}

export default LocationListItem