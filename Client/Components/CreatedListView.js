import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import styles  from '../Style/style.js'
import CreatedListItem from './CreatedListItem'
import Button from 'apsl-react-native-button'
import serverURL from '../Lib/url'

export default class CreatedListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createdLocations: [],
    }
  }

  //Here we will use the current user info to make a query to the DB and grab all of their savedLocations. Then set the state of 
  //Saved pins to these locations. 
  componentDidMount () {
    fetch(`${serverURL}/users/${this.props.currentUser._id}/created`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.userToken
      }
    })
      .then(response => response.json())
      .then(created => {
        this.setState({
          createdLocations: created
        })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  updateStateOfCreated (locationId) {
    const newCreated = this.state.createdLocations.filter(function (id) {
      return id._id !== locationId
    })
    this.setState({
      createdLocations: newCreated
    })
  }

  render() {
    return (
      <View style={[styles.listViewContainer, {flex:1, backgroundColor:'white'}]}>
        <Text style={{fontWeight:'bold', fontSize: 22, marginBottom: 15, color:'#ffa500'}}>Created Pins</Text>
        <ScrollView
          directionalLockEnabled={true}
          contentContainerStyle={styles.scrollModal}
        >
          {this.state.createdLocations.map((location, key) => (
          <CreatedListItem
            location={location}
            key={key}
            navigator={this.props.navigator}
            currentUser={this.props.currentUser}
            userToken={this.props.userToken}
            updateStateOfFavorites={this.updateStateOfCreated.bind(this)}
          />
          ))}
        </ScrollView>
      </View>  
    )
  }
}  
