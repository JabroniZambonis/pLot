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
import Icon from 'react-native-vector-icons/Entypo'

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
      reviews: [],
      buttonPress: false
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

  setButtonStyle (style) {
    this.setState({buttonPress: style})
  }

  render () {

    let reviewButtonStyle = this.state.buttonPress ? styles.reviewsButtonPress : styles.reviewsButton

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
          <Text>Rating: {this.props.rating}</Text>
          <View style={{width: 20}}>
            <Icon name="star" size={30} color="#900" />
          </View>
        </View>
        <View style={styles.parkingDescriptionImagesContainer}>
          <ImageSlider images={this.state.parkingSpacePics} />
        </View>
        <View style={styles.reviewButtonView}>
          <Button
            onPress={() => this.showReviews()}
            style={reviewButtonStyle}
            onPressIn={() => this.setButtonStyle(!this.state.buttonPress)} 
            onPressOut={() => this.setButtonStyle(!this.state.buttonPress)}
            textStyle={styles.reviewButtonText} 
          >Show Reviews
          </Button>
        </View>
      </View>
    )
  }
}