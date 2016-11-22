import styles  from '../Style/style.js'
import Helper from '../Lib/HomeMapHelperFns.js'
import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { View, StyleSheet, TextInput, Alert, Image, Text, ActivityIndicator, TouchableHighlight } from 'react-native'
import CreateLocation from './CreateLocation'
import ProfileView from './ProfileView'
import LocationListView from './LocationListView'
import LocationMarker from './LocationMarker'
import LocationMarkerPaid from './LocationMarkerPaid'
import LocationMarkerCallout from './LocationMarkerCallout'
import LocationMarkerPaidCallout from './LocationMarkerPaidCallout'
import ReturnToUser from './ReturnToUser'
import Button from 'apsl-react-native-button'


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
      userLocation: {},
      currentTime: '',
      nearbyLocations: [],
      nearbyPaidLocations: [],
      searchText: 'Search for spots...',
      lastPosition: {},
      address: '',
      addButtonPress: false,
      redoButtonPress: false
    }

    this.addLocation = this.addLocation.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.returnToUser = this.returnToUser.bind(this)
    this.getPinsForCoords = this.getPinsForCoords.bind(this)
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

  searchLocationSubmit = Helper.searchLocationSubmit

  // grabs user on mounting if component doesn't have one
  getUserInfo = Helper.getUserInfo

  // finds users location and grabs nearby pins
  setUserLocation = Helper.setUserLocation

  getPinsForCoords = Helper.getPinsForCoords

  getPaidPinsForCoords = Helper.getPaidPinsForCoords

  getAddressByCoords = Helper.getAddressByCoords

  //adds a pins to the map if the user opens the create location form
  addLocation = Helper.addLocation

  //Removes the pin from the map if the user does not save the new location
  cancelLocationAdd = Helper.cancelLocationAdd

  onRegionChange = Helper.onRegionChange

  returnToUser = Helper.returnToUser

  createLocationNav = Helper.createLocationNav

  createProfileNav = Helper.createProfileNav

  setAddButtonStyle (style) {
    this.setState({
      addButtonPress: style
    })
  }

  setRedoButtonStyle (style) {
    this.setState({
      redoButtonPress: style
    })
  }

  render () {
    let addButtonStyle = this.state.addButtonPress ? styles.addLocationButtonPress : styles.addLocationButton
    let redoSearchButton = this.state.redoButtonPress ? styles.redoSearchButtonPress : styles.redoSearchButton

    return (
      <View style={styles.homeContainer}>
        <View style={styles.searchBarContainer}>
          <TextInput
            returnKeyType="search"
            style={styles.searchBar}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.searchText}
            onSubmitEditing={(event) => this.searchLocationSubmit(event)}
            clearButtonMode={'while-editing'}
          />
        </View>

        <TouchableHighlight
          onPress={() => {
            this.createProfileNav()
          }}
        >
          <Image
            style={styles.profileViewImageButton}
            source={{uri: this.state.currentUser.photo}}
          />
        </TouchableHighlight>

        <ReturnToUser backToUser={this.returnToUser} />

        <View style={styles.homeMapContainer}>
          <MapView
            style={styles.homeMapView}
            region={this.state.currentLocation}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            ref="map"
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
              >
                <LocationMarker {...marker} />
                <MapView.Callout style={styles.locationMarkerCallout}>
                  <LocationMarkerCallout
                    {...marker}
                    navigator={this.props.navigator}
                    currentUser={this.state.currentUser}
                    userToken={this.props.userToken}
                  />
                </MapView.Callout>
              </MapView.Marker>
            ))}



            {this.state.nearbyPaidLocations.map((marker, key) => (
              <MapView.Marker
                key={marker.id}
                id={marker.id}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
                price={marker.price}
                onPress={(evt) => console.log('pressed ', evt.nativeEvent)}
                centerOffset={{x: 0, y: -20}}

              >
                <LocationMarkerPaid {...marker} />
                <MapView.Callout style={styles.locationMarkerCallout}>
                  <LocationMarkerPaidCallout  {...marker} navigator={this.props.navigator} />
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
          <Button
            style={redoSearchButton}
            textStyle={styles.reviewButtonText}
            onPress={() => (
              this.getPinsForCoords(this.state.currentLocation.longitude, this.state.currentLocation.latitude)
            )}
            onPressIn={() => this.setRedoButtonStyle(!this.state.redoButtonPress)}
            onPressOut={() => this.setRedoButtonStyle(!this.state.redoButtonPress)}
            activeOpacity={1}
          >
            Redo Search
          </Button>

          <Button
            onPress={() => {
              this.createLocationNav()
            }}
            onPressIn={() => this.setAddButtonStyle(!this.state.addButtonPress)}
            onPressOut={() => this.setAddButtonStyle(!this.state.addButtonPress)}
            style={addButtonStyle}
            textStyle={styles.addLocationButtonText}
            activeOpacity={1}
          >
            +
          </Button>
      </View>
    )
  }
}