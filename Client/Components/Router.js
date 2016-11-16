const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Navigator, Text } from 'react-native'
import HomeMap from './HomeMap'
import ParkingDetails from './ParkingDetails'
import NavButton from './NavButton'

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
          return <ParkingDetails navigator={navigator} {...route} />
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
