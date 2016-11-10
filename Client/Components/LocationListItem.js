import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

const LocationListItem = (props) => (
  <View>
    <Text>{props.location.title}</Text>
    <Text>{props.location.address}</Text>
  </View>
)
