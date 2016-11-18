import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   Text,
   Image,
   StyleSheet
} from 'react-native';

export default class LoadingPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
   return (
      <View style={styles.container}>
         <View style={styles.logoContainer}>
            <Text style={styles.loginText}><Image style={styles.logo} source={require('../Public/parkinglogo.png')}/>Lot </Text>
         </View>
         <ActivityIndicator animating={this.props.animating}
           style = {styles.activityIndicator} size = "large" color='orange'
         />
         <Text style={styles.loading}>Loading...</Text>
      </View>
   );
 }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },

   logoContainer: {
    width: 190,
    flex: 2,
    justifyContent: 'flex-end',
    paddingRight: 28
   },

   logo: {
      width: 50,
      height: 50
   },

   loginText : {
      fontWeight: 'bold',
      fontSize: 50,
      textAlign: 'center',
      color: 'orange',
      height: 90,
      paddingBottom: 150
    },
   
   activityIndicator: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 50
   },

   loading: {
      flex: 1,
      justifyContent: 'flex-start',
      color: '#666666',
      fontSize: 20,
      marginTop: 50,
      fontWeight: 'bold'
   }
});