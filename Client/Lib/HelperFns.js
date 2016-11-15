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