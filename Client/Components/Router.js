const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Navigator, Text, View } from 'react-native'
import HomeMap from './HomeMap'
import CreateLocation from './CreateLocation'
import ParkingDetails from './ParkingDetails'
import ReviewsList from './ReviewsList'
import CreateReview from './CreateReview'
import NavButtonBack from './NavButtonBack'
import NavButton from './NavButton'
import Navbar from './Navbar'
import ProfileView from './ProfileView'

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
        case 'ProfileView':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButtonBack text="map" onPress={() => navigator.pop()}/>
                }
              />
              <ProfileView navigator={navigator} {...route}/>
            </View>
          )
          break
        case 'Camera':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButtonBack text="create" onPress={() => navigator.pop()}/>
                }
              />
              <Camera navigator={navigator} {...route}/>
            </View>
          )
          break
        case 'CreateLocation':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButtonBack text="map" onPress={() => navigator.pop()}/>
                }
              />
              <CreateLocation navigator={navigator} {...route} />
            </View>
          )
          break
        case 'ParkingDetails':
          return (
            <View style={{flex: 1}}>
              <Navbar
                leftButton={
                  <NavButtonBack text="map" onPress={() => navigator.pop()}/>
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
                  <NavButtonBack text="back" onPress={() => navigator.pop()}/>
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
