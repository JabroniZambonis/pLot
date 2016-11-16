import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

const s = StyleSheet.create({
  text: {
    color: 'white'
  }
})

export default ({ onPress, text }) => (
  <TouchableHighlight onPress={onPress}>
    <Text style={s.text}>{text}</Text>
  </TouchableHighlight>
)