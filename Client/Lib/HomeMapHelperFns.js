import { Alert } from 'react-native'
import serverURL from './url'


exports.getAddressByCoords = function(lat, long) {
  return fetch(`${serverURL}/locations/googlebycoords?lat=${lat}&long=${long}`)
    .then(response => response.json())
    .then(data => {
      this.setState({address: data})
    })
}


exports.getUserInfo = function() {
  fetch(`${serverURL}/auth/login`, {
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


exports.searchLocationSubmit = function(event) {
  let searchString = event.nativeEvent.text
  fetch(`${serverURL}/locations/byaddr?q=${searchString}`)
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
        const nearby = locationsAndCoords.locations
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


exports.getUserInfo = function() {
  fetch(`${serverURL}/auth/login`, {
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


exports.setUserLocation = function() {
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

      //get paid pins near users location
      this.getPaidPinsForCoords(currentLocation.latitude, currentLocation.longitude)

      this.getAddressByCoords(currentLocation.latitude, currentLocation.longitude)
    })
}


exports.getPinsForCoords = function(long, lat) {
  this.setState({
    animating: true
  })
  fetch(`${serverURL}/locations/bycoords?long=${long}&lat=${lat}`)
    .then(response => response.json())
    .then(locations => {

      // This setTimeout slows down the request so the user gets some
      // feedback with the ActivityIndicator
      setTimeout(() => {
        if (locations.length === 0) {
          this.setState({
            animating: false
          })
        }
        this.setState({
          nearbyLocations: locations,
          animating: false
        })
      }, 600)
    })
    .catch((err) => {
      this.setState({
        animating: false
      })
      console.log(err)
    })

}


exports.getPaidPinsForCoords = function(lat, long) {
  fetch(`${serverURL}/locations/parkwhizbycoords?lat=${lat}&long=${long}`)
    .then(response => response.json())
    .then(locations => {
      let nearby = locations.parking_listings.map(location => {
        return {
          title: location.address,
          description: location.location_name,
          coordinate : {
            latitude: location.lat,
            longitude: location.lng
          },
          rating: location.recommendations,
          id: location.location_id,
          price: location.price_formatted
        }
      })
      //set components nearby pins
      this.setState({ nearbyPaidLocations: nearby})
    })
    .catch((err) => {
      console.log("ERROR getPaidPinsForCoords in HomeMapHelperFns.js: ", err)
    })
}


exports.addLocation = function({lat, long, address, description}) {
  let newPin = {
    coordinate: {
      latitude: lat,
      longitude: long
    },
    title: address,
    description: description
  }
  let newNearby = this.state.nearbyLocations.slice()
  newNearby.push(newPin)
  this.setState({
    nearbyLocations: newNearby
  })
}


exports.onRegionChange = function(currentLocation) {
  this.setState({ currentLocation })
}

exports.returnToUser = function () {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }
  this.setState({
    userLocation: userLocation
  })
  this.refs.map.animateToCoordinate(userLocation, 500)
  })
}

//creates profile view
exports.createProfileNav = function() {
  this.props.navigator.push({
    name: 'ProfileView',
    logOut: this.props.logOut,
    currentUser: this.state.currentUser,
    userToken: this.props.userToken
  })
}

exports.createLocationNav = function() {
  this.props.navigator.push({
    name: 'CreateLocation',
    userToken: this.props.userToken,
    addLocation: this.addLocation,
    currentLocation: this.state.currentLocation,
    navigator: this.props.navigator
  })
}
