import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default Review = (props) => (
  <View style={style.reviewContainer}>
    <Text>{props.rating}</Text>
    <Text>{props.content}</Text>
  </View>
)

const style = StyleSheet.create({
  reviewContainer: {
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#64AFCB',
    borderStyle: 'solid',
    borderRadius: 10
  }
})