import styles  from '../Style/style.js'
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { View, StyleSheet, TextInput, Alert } from 'react-native'
import CreateLocation from './CreateLocation'
import ProfileView from './ProfileView'
import LocationListView from './LocationListView'

export default class HomeMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
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
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentDidMount () {
    // if we don't have a user fetch the user belonging to current access token
    if (!this.state.currentUser._id) {
      this.getUserInfo()
    }
    // grab users location and nearby pins
    this.setUserLocation()
 
    // Probably not needed for now
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
            loca.coordinate = {
              latitude: location.loc[1],
              longitude: location.loc[0]
            }
            loca.title = location.address
            loca.description = location.description
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

  // grabs user on mounting if component doesn't have one
  getUserInfo () {
    fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': this.props.userToken
      }
    })
    .then(response => response.json())
    .then( (userData) => {
      this.setState({currentUser: userData})
    })
    // catch any errors
    .catch( (err) => {
      console.log(err)
    })
  }

  // finds users location and grabs nearby pins
  setUserLocation () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
        this.setState({
          currentLocation: currentLocation
        })
        // get pins near users location
        this.getPinsForCoords(currentLocation.longitude, currentLocation.latitude)
      },
      // error finding users location
      (error) => console.log(error),
      // location finding settings
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  // given a long and a latitude this finds pins saved nearby
  getPinsForCoords (long, lat) {
    fetch(`http://localhost:3000/locations/bycoords?long=${long}&lat=${lat}`)
      .then(response => response.json())
      .then(locations => {
        const nearby = locations.map(location => {
          return {
            title: location.address,
            description: location.description,
            coordinate: {
              longitude: location.loc[0],
              latitude: location.loc[1]
            },
            rating: location.rating,
            id: location._id
          }
        })
        // set components nearby pins
        this.setState({ nearbyLocations: nearby})
      })
      .catch(console.log)
  }

  getUserInfo () {
    fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      headers:{
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': this.props.userToken
      }
    })
    .then(response => response.json())
    .then(user => {
      this.setState({ currentUser: user})
    })
    .catch(err => console.log('Error grabbing user: ', err))
  }

  //adds a pins to the map if the user opens the create location form
  addLocation () {
    let lat = this.state.currentLocation.latitude
    let long = this.state.currentLocation.longitude
    let newPin = {
      coordinate: {
        latitude: lat,
        longitude: long
      }
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

  handlePinPress (location, id) {
    console.log(location)
  }

  onRegionChange (currentLocation) {
    this.setState({ currentLocation })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          returnKeyType="search"
          style={styles.searchBar}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.searchText}
          onSubmitEditing={(event) => this.searchLocationSubmit(event)}
        />
        <ProfileView currentUser={this.state.currentUser} logOut={this.props.logOut} logOut={this.props.logOut}/>
        <MapView
          style={styles.homeMap}
          region={this.state.currentLocation}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          onPress={(evt) => console.log(evt.nativeEvent.coordinate)}
        >
          {this.state.nearbyLocations.map((marker, key) => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={(evt) => console.log('pressed ', evt)}
            />
          ))}
          <MapView.Marker
            coordinate={this.state.currentLocation}
            pinColor={'#0000ff'}
          />
        </MapView>

        <LocationListView 
          nearbyLocations={this.state.nearbyLocations}
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
