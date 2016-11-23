import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import styles  from '../Style/style.js'
import FavoritesListItem from './FavoritesListItem'
import Button from 'apsl-react-native-button'
import serverURL from '../Lib/url'

export default class FavoritesListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedLocations: [],
    }
  }

  //Here we will use the current user info to make a query to the DB and grab all of their savedLocations. Then set the state of 
  //Saved pins to these locations. 
  componentDidMount () {
    fetch(`${serverURL}/users/${this.props.currentUser._id}/saved`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.userToken
      }
    })
      .then(response => response.json())
      .then(favorites => {
        this.setState({
          savedLocations: favorites
        })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  updateStateOfFavorites (locationId) {
    const newFavs = this.state.savedLocations.filter(function (id) {
      return id._id !== locationId
    })
    this.setState({
      savedLocations: newFavs
    })
  }

  render() {
    return (
      <View style={[styles.listViewContainer, {flex:1, backgroundColor:'white'}]}>
        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 15}}>Favorites</Text>
        <ScrollView
          directionalLockEnabled={true}
          contentContainerStyle={styles.scrollModal}
        >
          {this.state.savedLocations.map((location, key) => (
          <FavoritesListItem
            location={location}
            key={key}
            navigator={this.props.navigator}
            currentUser={this.props.currentUser}
            userToken={this.props.userToken}
            updateStateOfFavorites={this.updateStateOfFavorites.bind(this)}
          />
          ))}
        </ScrollView>
      </View>  
    )
  }
}  

