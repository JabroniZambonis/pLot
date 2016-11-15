exports.getPinsForCoords = function(long, lat) {
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


exports.getAddressByCoords = function(lat, long) {
  fetch(`http://localhost:3000/locations/googlebycoords?lat=${lat}&long=${long}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Got data: ', data)
      this.setState({address: data})
    })
    .catch((err) => {
      console.log('This did not work: ', err)
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

      //TO DO: Call function with appropriate things
    },
    // error finding users location
    (error) => console.log(error),
    // location finding settings
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  )
}


exports.getUserInfo = function() {
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


exports.searchLocationSubmit = function(event) {
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