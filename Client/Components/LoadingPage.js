import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   Text,
   StyleSheet
} from 'react-native';

export default class LoadingPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
   return (
      <View style={styles.container}>
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

   activityIndicator: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 80
   },

   loading: {
      flex: 1,
      justifyContent: 'flex-start',
      color: 'gray',
      fontSize: 20,
      marginTop: 50,
      fontWeight: 'bold'
   }
});