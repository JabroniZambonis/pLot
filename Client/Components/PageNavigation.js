import React, { Component } from 'react'
import {
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native'

import HomeMap from './HomeMap'
import LoginPage from './LoginPage'

export default class NavAllDay extends Component {

  renderScene (route, navigator) {
    return <route.component
             navigator={navigator} />
  }


  render () {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: HomeMap
        }}
      // style={{padding: 5}}
      />
    )
  }
}  

