import { Alert } from 'react-native'
import serverURL from './url'


exports.getAddressByCoords = function(lat, long) {
  fetch(`${serverURL}/locations/googlebycoords?lat=${lat}&long=${long}`)
    .then(response => response.json())
    .then(data => {
      console.log('Got data: ', data)
      this.setState({address: data})
    })
    .catch((err) => {
      console.log('This did not work: ', err)
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
  fetch(`${serverURL}/locations/bycoords?long=${long}&lat=${lat}`)
    .then(response => response.json())
    .then(locations => {
      if (locations.length === 0) {
          Alert.alert(
            'Sorry',
            'No parking spots found near that address',
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          )
        }
      this.setState({ nearbyLocations: locations})
    })
    .catch(console.log)
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


exports.addLocation = function() {
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
exports.cancelLocationAdd = function() {
  let nearby = this.state.nearbyLocations.slice()
  nearby.pop()
  this.setState({
    nearbyLocations: nearby
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
  this.getPinsForCoords(userLocation.longitude, userLocation.latitude)
  this.getPaidPinsForCoords(userLocation.latitude, userLocation.longitude)
  })
}

//creates profile view 
exports.createProfileNav = function() {
  this.props.navigator.push({
    name: 'ProfileView',
    logOut: this.props.logOut,
  })
}

exports.createLocationNav = function() {
  this.props.navigator.push({
    name: 'CreateLocation',
    userToken: this.props.userToken,
    addLocation: this.addLocation,
    cancelLocationAdd: this.cancelLocationAdd,
    currentLocation: this.state.currentLocation,
    address: this.state.address,
    navigator: this.props.navigator
  })
}
