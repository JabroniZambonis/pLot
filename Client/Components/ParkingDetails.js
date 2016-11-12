import React, { Component } from 'react'
import {
  View,
  Text,
  Image
} from 'react-native'
import MapView from 'react-native-maps'
import styles  from '../Style/style.js'

export default class ParkingDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 30.2385295,
        longitude: -97.740536,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
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

  // componentDidMount() {
  //   this.setState = ({
  //     pinLocation: {
  //       latitude: 30.264,
  //       longitude: -97.742,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01
  //     }
  //   })
  // }

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

            />
      </MapView>
      <View style={styles.parkingDescriptionContainer}>
         <Text>
         Description:
         </Text>
         <Text style={styles.parkingDescriptionText}>
         {this.state.parkingSpotDescription}
         </Text>
      </View>
      <View style={styles.parkingDescriptionImagesContainer}>
        <Image 
          source={require('../Public/reservedParkingSizeTest.jpg')}
          style={styles.parkingDescriptionImages}
         />
        <Image 
          source={require('../Public/anotherParkingImage.jpg')}
          style={styles.parkingDescriptionImages}
         />
        <Image 
          source={require('../Public/bikeParking.jpg')}
          style={styles.parkingDescriptionImages}
         />  
      </View>  
    </View>
    )
  }
}