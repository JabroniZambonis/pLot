import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import ImageSlider from 'react-native-image-slider'
import MapView from 'react-native-maps'
import styles  from '../Style/style.js'

export default class ParkingDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 30.2385295,
        longitude: -97.740536,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      pinLocation: {
        latitude: 30.2385295,
        longitude: -97.740536,
        latitudeDelta: .001,
        longitudeDelta: .001
      },
      parkingSpotDescription: "This parking spot may be one of the absolute best in Austin. If you are anywhere near downtown you will definitely want to check this spot out first."
    }
  }

  componentDidMount() {
    // this.setState = ({
    //   pinLocation: {
    //     latitude: 30.264,
    //     longitude: -97.742,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01
    //   }
    // })
    console.log('Coords?: ', this.props.coordinate)
  }


render () {
    return (
    <View style={styles.parkingDetailsContainer}>        
      <MapView
        style={styles.parkingDetailsMapContainer}
        region={this.state.region}
        scrollEnabled={false}
        zoomEnabled={false}
      >
       <MapView.Marker
              // key={}
              coordinate={this.state.pinLocation}
              // title={}
              // description={}
              image={require('../Public/existingPins.png')}
              centerOffset={{x: 0, y: -20}}
              rotateEnabled={false}
              pitchEnabled={false}
              />
      </MapView>
      <View style={styles.parkingDescriptionContainer}>
         <Text style={{fontFamily: 'Trebuchet MS', fontWeight: 'bold', fontSize: 15}}>
         Parking Details:
         </Text>
         <Text style={styles.parkingDescriptionText}>
         {this.props.description}
         </Text>
      </View>
      <View style={styles.parkingDescriptionImagesContainer}>
        <ImageSlider images={[require('../Public/reservedParkingSizeTest.jpg'),
                              require('../Public/anotherParkingImage.jpg'),
                              require('../Public/bikeParking.jpg')]}
         />
      </View>  
    </View>
    )
  }
}