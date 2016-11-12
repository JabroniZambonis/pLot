import React, { Component } from 'react'
import {
  View,
  TouchableHighlight
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
      }
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
    </View>  
    )
  }
}