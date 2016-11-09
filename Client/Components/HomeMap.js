const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, StyleSheet, MapView, TextInput, Alert } from 'react-native'
import CreateLocation from './CreateLocation'
import ProfileView from './ProfileView'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentLocation: {
        latitude: 30.2689941,
        longitude: -97.7405441,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      },
      nearbyLocations: [],
      searchText: 'Search for spots...',
      lastPosition: {}
    }
    this.addLocation = this.addLocation.bind(this)
    this.cancelLocationAdd = this.cancelLocationAdd.bind(this)
  }

  componentDidMount () {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }

        this.setState({currentLocation: currentLocation})

        fetch(`http://localhost:3000/locations/bycoords?long=${position.coords.longitude}&lat=${position.coords.latitude}`)
          .then((response) => response.json())
          .then((locations) => {
         
            const nearby = []

            locations.forEach(function(location) {
              let loca = {}
              loca.latitude = location.loc[1]
              loca.longitude = location.loc[0]
              loca.title = location.address
              loca.subtitle = location.description
              loca.animateDrop = true
              nearby.push(loca)
            })

            this.setState({nearbyLocations: nearby})
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
    let searchString = event.nativeEvent.text
    fetch(`http://localhost:3000/locations/byaddr?q=${searchString}`)
      .then((response) => response.json())
      .then((locationsAndCoords) => {

        if (!locationsAndCoords.coords) {
          Alert.alert(
          'Try Again',
          'No address found at that location',
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        )

        } else {
          console.log('thisiisisi',locationsAndCoords)
          if (locationsAndCoords.locations.length === 0) {
            Alert.alert(
              'Sorry',
              'No parking spots found near that address',
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            )
          }


          const nearby = []

          locationsAndCoords.locations.forEach(function(location) {
            let loca = {}
            loca.latitude = location.loc[1]
            loca.longitude = location.loc[0]
            loca.title = location.address
            loca.subtitle = location.description
            loca.animateDrop = true
            nearby.push(loca)
          })

          this.setState({
            nearbyLocations: nearby,
            currentLocation: {
              latitude: locationsAndCoords.coords[0],
              longitude: locationsAndCoords.coords[1],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          }) 
        }

      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  //adds a pins to the map if the user opens the create location form
  addLocation () {
    let lat = this.state.currentLocation.latitude
    let long = this.state.currentLocation.longitude

    let newPin = {
      latitude: lat,
      longitude: long,
      animateDrop: true,
      draggable: true
    }

    let newNearby = this.state.nearbyLocations.slice()

    newNearby.push(newPin)
    this.setState({
      nearbyLocations: newNearby
    })
  }

  //Removes the pin from the map if the user does not save the new location
  cancelLocationAdd () {
    let nearby = this.state.nearbyLocations.slice()
    nearby.pop()
    this.setState({
      nearbyLocations: nearby
    })
  }

  render () {
    console.log("HomeMap.js this.props: ", this.props)
    return (
      <View>
        <TextInput
          returnKeyType="search"
          style={{height: 30, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.searchText}
          onSubmitEditing={(event) => this.searchLocationSubmit(event)}
        />
        <ProfileView props={this.props} />
        <MapView
          style={styles.homeMap}
          region={this.state.currentLocation}
          annotations={this.state.nearbyLocations}
          showsUserLocation={true}
        />
        <CreateLocation
          addLocation={this.addLocation}
          cancelLocationAdd={this.cancelLocationAdd}
          currentLocation={this.state.currentLocation}
        />
      </View>
    )
  }
}
