import React, { Component } from 'react'
import { View, StyleSheet, MapView, TextInput } from 'react-native'
import CreateLocation from './CreateLocation'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentLocation: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      nearbyPins: [
        {
          latitude: 30.26,
          longitude: -97.74,
          title: 'Cool Parking',
          subtitle: '123 Jabroni Street'
        },
        {
          latitude: 30.27,
          longitude: -97.75,
          title: 'Cool Parking',
          subtitle: '456 Zamboni Ave'
        }
      ],
      searchText: 'Search for spots...',
      lastPosition: {}
    }
    this.addLocation = this.addLocation.bind(this)
  }

  componentDidMount () {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }

        this.setState({currentLocation: currentLocation})

        return fetch(`/locations/bycoords?long=${position.coords.longitude}&lat=${position.coords.latitude}`)
          .then((pins) => {
            this.setState({nearbyPins: pins})
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )

    //Probably not needed for now
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   let lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // })
    // console.log('watchID: ',this.watchID)
  }

  searchLocationSubmit (event) {
    console.log('searchString: ',event.nativeEvent.text)
    let searchString = event.nativeEvent.text
    return fetch(`/locations/byaddr?q=${searchString}`)
      .then((response) => {
        // search location location
        // array of nearby pin objects

        // re-center the map at the coords of the search location

        // render pins for the nearby parking spots

      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  addLocation () {
    console.log('pressed')
    let lat = this.state.currentLocation.latitude
    let long = this.state.currentLocation.longitude

    let newPin = {
      latitude: lat,
      longitude: long,
      animateDrop: true,
      draggable: true
    }

    let newNearby = this.state.nearbyPins.slice()

    newNearby.push(newPin)
    this.setState({
      nearbyPins: newNearby
    })
  }

  render () {
    return (
      <View>
        <TextInput
          style={{height: 30, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.searchText}
          onSubmitEditing={(event) => this.searchLocationSubmit(event)}
        />
        <MapView
          region={this.state.currentLocation}
          annotations={this.state.nearbyPins}
          style={{height: 500, width: 300}}
          showsUserLocation={true}
        />
      </View>
    )
  }
}
