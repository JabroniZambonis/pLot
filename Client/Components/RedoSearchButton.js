import React, { Component } from 'react'
import { Text } from 'react-native'
import Button from 'apsl-react-native-button'

export default RedoSearchButton = (props) => {
  return (
    <Button
      onPress={() => props.getPinsForCoords(this.state.currentLocation.longitude, this.state.currentLocation.latitude)}
    >
      <Text>Redo Search</Text>
    </Button>
  )
}