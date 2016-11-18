import styles  from '../Style/style.js'
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import MapView from 'react-native-maps'

export default ReturnToUser = (props) => {
   
  return (
   <View>
     <TouchableOpacity onPress={ () => props.backToUser()}>
       <Image
         source={require('../Public/GPS.png')}
         style={styles.returnToUserButton}
       />
     </TouchableOpacity>
   </View>
  )
}  
