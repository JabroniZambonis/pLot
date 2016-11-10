import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles  from '../Style/style.js'

const LocationListItem = (props) => (
  <View style={styles.listItemView}>
    <Text>{props.location.title}</Text>
    <Text>{props.location.description}</Text>
  </View>
)

export default LocationListItem