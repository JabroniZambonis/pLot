import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'
import ImageSlider from 'react-native-image-slider'
import MapView from 'react-native-maps'
import styles  from '../Style/style.js'
import Button from 'apsl-react-native-button'

export default class ParkingDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: this.props.coordinate.latitude,
        longitude: this.props.coordinate.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      pinLocation: {
        latitude: this.props.coordinate.latitude,
        longitude: this.props.coordinate.longitude,
        latitudeDelta: .001,
        longitudeDelta: .001
      },
      parkingSpacePics: [
        require('../Public/reservedParkingSizeTest.jpg'),
        require('../Public/anotherParkingImage.jpg'),
        require('../Public/bikeParking.jpg')
      ],
      reviews: []
    }
  }

  //Will need this later for fetching and loading images of parking spaces and reviews from the database
  componentDidMount() {
    fetch(`http://localhost:3000/locations/${this.props.id}/reviews`)
    .then(response => response.json())
    .then(reviews => {
      if(reviews.length > 0) {
        this.setState({
          reviews: reviews
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  showReviews () {
    this.props.navigator.push({
      name: 'ReviewsList',
      reviews: this.state.reviews,
      currentUser: this.props.currentUser,
      locationId: this.props.id
    })
  }


  render () {
    let buttonPress = false
    let addButtonStyle = buttonPress ? styles.listViewCloseContainerPress : styles.listViewCloseContainer

    return (
      <View style={styles.parkingDetailsContainer}>        
        <MapView
          style={styles.parkingDetailsMapContainer}
          region={this.state.region}
          scrollEnabled={false}
          zoomEnabled={false}
        >
         <MapView.Marker
          key={this.props.key}
          coordinate={this.state.pinLocation}
          // title={}
          // description={}
          image={require('../Public/existingPins.png')}
          centerOffset={{x: 0, y: -20}}
          rotateEnabled={false}
          pitchEnabled={false}
        />
        </MapView>
          <Text style={styles.parkingDetailsAddress}>{this.props.title}</Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontWeight: 'bold', fontSize: 15}}>
            Parking Details:
          </Text>
        <View style={styles.parkingDescriptionContainer}>
          <Text style={styles.parkingDescriptionText}>
            {this.props.description}
          </Text>
        </View>
        <View style={styles.parkingDescriptionImagesContainer}>
          <ImageSlider images={this.state.parkingSpacePics} />
        </View>
        <Button
          onPress={ () => this.showReviews() }
          style={addButtonStyle}
          onPressIn={() => buttonPress = true} 
          onPressOut={() => buttonPress = false}
          textStyle={styles.listViewToggleText} 
        >Show Reviews
        </Button>
      </View>
    )
  }
}