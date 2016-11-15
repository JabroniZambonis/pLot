import styles  from '../Style/style.js'
import Helper from '../Lib/HomeMapHelperFns.js'
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { View, StyleSheet, TextInput, Alert, Image } from 'react-native'
import CreateLocation from './CreateLocation'
import ProfileView from './ProfileView'
import LocationListView from './LocationListView'
import LocationMarker from './LocationMarker'
import LocationMarkerCallout from './LocationMarkerCallout'

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
      currentTime: '',
      nearbyLocations: [],
      nearbyPaidLocations: [],
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
    // 
    
  }

  searchLocationSubmit = Helper.searchLocationSubmit

  // grabs user on mounting if component doesn't have one
  getUserInfo = Helper.getUserInfo

  // finds users location and grabs nearby pins
  setUserLocation = Helper.setUserLocation
  
  getPinsForCoords = Helper.getPinsForCoords

  getPaidPinsForCoords = Helper.getPaidPinsForCoords

  //adds a pins to the map if the user opens the create location form
  addLocation = Helper.addLocation

  //Removes the pin from the map if the user does not save the new location
  cancelLocationAdd = Helper.cancelLocationAdd

  onRegionChange = Helper.onRegionChange

  render () {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            returnKeyType="search"
            style={styles.searchBar}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.searchText}
            onSubmitEditing={(event) => this.searchLocationSubmit(event)}
          />
        </View>

        <ProfileView currentUser={this.state.currentUser} logOut={this.props.logOut}/>
        
        <View style={styles.homeMapContainer}>
          <MapView
            style={styles.homeMapView}
            region={this.state.currentLocation}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            
          >
            {this.state.nearbyLocations.map((marker, key) => (
              <MapView.Marker
                key={marker.id}
                id={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                onPress={(evt) => console.log('pressed ', evt.nativeEvent)}
                centerOffset={{x: 0, y: -20}}
                reviews={marker.reviews}
              >
                <LocationMarker {...marker} />
                <MapView.Callout style={styles.locationMarkerCallout}>
                  <LocationMarkerCallout 
                    {...marker}
                    navigator={this.props.navigator}
                    currentUser={this.state.currentUser}
                  />
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>

          <View style = {styles.mapCenterMarkerView}>
            <Image
              style={styles.mapCenterMarker}
              source={require('../Public/centerMap.png')}
            />
          </View>
        </View>

        <LocationListView 
          nearbyLocations={this.state.nearbyLocations}
          navigator={this.props.navigator}
        />

        <CreateLocation
          userToken={this.props.userToken}
          addLocation={this.addLocation}
          cancelLocationAdd={this.cancelLocationAdd}
          currentLocation={this.state.currentLocation}
        />
      </View>
    )
  }
}
