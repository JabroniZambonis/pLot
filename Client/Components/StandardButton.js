import React from 'react'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'

const StandardButton = ({buttonText}) => (
  <View style={buttonStyle.buttonContainer}>
    <TouchableHighlight>
      <Text>{buttonText}</Text>
    </TouchableHighlight>
  </View>
)

const buttonStyle = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#64AFCB'
  },
  buttonText: {
    color: '#64AFCB',
    textAlign: 'center',
    backgroundColor: '#efefef',
  }
})

export default StandardButton