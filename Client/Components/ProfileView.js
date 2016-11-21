const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableOpacity, Text,View} from 'react-native'

export default class ProfileView extends Component {
  constructor(props) {
    super(props)
  }

  showFavoritesList () {
    this.props.navigator.push({
      name: 'FavoritesList',
      currentUser: this.props.currentUser
    })
  }
  
  finishedLogout (error, result) {
    this.props.logOut()
  }

  render () {
    return (
        <View style={{flex:1,backgroundColor:'white',}}>
          <TouchableOpacity style={styles.profileViewButton}>
            <Text style={styles.profileViewText}>Created Pins</Text>
          </TouchableOpacity>
          <TouchableHighlight onPress={this.showFavoritesList.bind(this)}>
            <Text style={styles.profileViewText}>Favorites</Text>
          </TouchableHighlight>
          <TouchableOpacity style={styles.profileViewButton}>
            <Text style={styles.profileViewText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileViewButton}>
            <Text style={styles.profileViewText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileViewButton} onPress={this.finishedLogout.bind(this)}>
            <Text style={styles.profileViewText}>Log Out</Text>
          </TouchableOpacity>
        </View>
    )
  }
}
