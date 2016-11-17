const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Navigator, Text, View } from 'react-native'
import HomeMap from './HomeMap'
import ParkingDetails from './ParkingDetails'
import ReviewsList from './ReviewsList'
import CreateReview from './CreateReview'
import NavButton from './NavButton'
import Navbar from './Navbar'

export default class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  	this.renderScene = this.renderScene.bind(this)
    }

    renderScene(route, navigator) {
      switch (route.name) {
        case 'HomeMap':
          return <HomeMap navigator={navigator} {...route} />
          break
        case 'Camera':
          return <Camera navigator={navigator} {...route} />
          break
        case 'ParkingDetails':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButton text="map" onPress={() => navigator.pop()}/>
                }
              />
              <ParkingDetails navigator={navigator} {...route}/>
            </View>
          )
          break
        case 'ReviewsList':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButton text="back" onPress={() => navigator.pop()}/>
                }
                rightButton={
                  <NavButton
                    text="+Review"
                    onPress={() => navigator.push({
                      name: 'CreateReview',
                      locationId: route.locationId,
                      currentUser: route.currentUser
                    })}
                  />
                }
              />
              <ReviewsList navigator={navigator} {...route} />
            </View>
          )
          break
        case 'CreateReview':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButton text="Cancel" onPress={() => navigator.pop()}/>
                }
              />
              <CreateReview navigator={navigator} {...route} userToken={this.props.userToken} />
            </View>
          )
          break
      }
  	}

    render () {
    	return (
        <Navigator
    		  initialRoute = {
            {
              name: 'HomeMap',
              currentUser: this.props.currentUser,
              userToken: this.props.userToken,
              logOut: this.props.logOut,
              reanimator: this.props.reanimator
            }
          }
    		  renderScene={this.renderScene}
        />
      )
    }
  }
