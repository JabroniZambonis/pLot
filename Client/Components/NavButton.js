import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, Image } from 'react-native'
import Button from 'apsl-react-native-button'

const styles = require('../Style/style.js')

export default ({ onPress, text }) => (
  <Button onPress={onPress} style={styles.navButton}>
  	<Text style={styles.navButtonBackText}>{text}</Text>
  </Button>
)