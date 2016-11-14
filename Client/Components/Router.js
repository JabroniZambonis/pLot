const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Navigator } from 'react-native'
import HomeMap from './HomeMap'

export default class App extends Component {
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
              logOut: this.logOut,
              reanimator: this.reanimator
            }
          }
    		  renderScene= {this.renderScene}
        />
      )
    }
  }