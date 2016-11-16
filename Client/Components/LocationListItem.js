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
      title: props.location.title
    });

  }

  return (
      <View style={styles.listItemView}>
        <TouchableOpacity onPress={ () => { handleButtonPress();
                                            props.setModalVisible(!props.modalState)
                                          }}
        >
          <View style={styles.listItemText}>
            <Text style={{fontWeight: 'bold'}}>{props.location.title}</Text>
            <Text>{props.location.description}</Text>
          </View>
          <View style={styles.listItemArrow}>
            <Image
              style={{height: 20}}
              source={require('../Public/Arrow-Icon.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
  )
}

export default LocationListItem