/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './Client/Components/App'

export default class pLot extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('pLot', () => pLot)
