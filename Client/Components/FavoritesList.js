import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import styles  from '../Style/style.js'
import LocationListItem from './LocationListItem'
import Button from 'apsl-react-native-button'

export default class FavoritesListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedLocations: {},
    }
  }

  //Here we will use the current user info to make a query to the DB and grab all of their savedLocations. Then set the state of 
  //Saved pins to these locations. 
  componentDidMount () {
   console.log('Should have the current user info in FavoritesList', this.props.currentUser)
  }

  render() {
    return (
      <View>
        <Text>This will be a list of favorites</Text>
      </View>  
    )
  }

}  

