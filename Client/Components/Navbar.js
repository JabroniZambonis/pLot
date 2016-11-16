import React, { Component } from 'react'
import { View } from 'react-native'

export default ({ leftButton, rightButton, title }) => (
  <View>
    {leftButton}
    {title}
    {rightButton}
  </View>
)