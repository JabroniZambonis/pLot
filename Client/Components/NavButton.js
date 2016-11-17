import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'
import Button from 'apsl-react-native-button'

const styles = require('../Style/style.js')

export default ({ onPress, text }) => (
  <Button onPress={onPress} style={styles.navButtonBack} activeOpacity={.08}>
  	<Text style={styles.navButtonBackText}>{text}</Text>
  </Button>
)