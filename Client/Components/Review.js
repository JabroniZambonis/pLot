import React from 'react'
import { View, Text } from 'react-native'

const Review = (props) => (
  <View>
    <Text>{props.rating}</Text>
    <Text>{props.content}</Text>
  </View>
)

export default Review