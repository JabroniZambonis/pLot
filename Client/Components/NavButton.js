import React, { Component } from 'react'
import { TouchableHighlight, Text } from 'react-native'

export default ({ onPress, text }) => (
  <TouchableHighlight onPress={onPress}>
    <Text>{text}</Text>
  </TouchableHighlight>
)