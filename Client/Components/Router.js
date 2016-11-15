const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Navigator } from 'react-native'
import HomeMap from './HomeMap'
import ParkingDetails from './ParkingDetails'
import ReviewsList from './ReviewsList'
import CreateReview from './CreateReview'

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
        case 'ReviewsList':
          return <ReviewsList navigator={navigator} {...route} />
          break
        case 'CreateReview':
          return <CreateReview navigator={navigator} {...route} userToken={this.props.userToken} />
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
    		  renderScene= {this.renderScene}
        />
      )
    }
  }
