import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native'

export default ReturnToUser = (props) => {
   
  return (
    <View>
      <TouchableHighlight onPress={() => props.backToUser()}>
        <View style={styles.returnToUserButton}>
          <Image
            source={require('../Public/GPS.png')}
            style={{height: 30, width: 30, top: 9, left: 5}}
          />
        </View>
      </TouchableHighlight>
    </View>
  )
}  
