import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const s = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#64AFCB',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10
  },
  leftButton: {
    flex: 1
  },
  rightButton: {
    flex: 1
  }
})

export default class Navbar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={s.navbar}>
        {this.createLeftButton()}
        {this.createRightButton()}
      </View>
    )
  }

  createLeftButton () {
    // take button given as prop and give it styling
    if (this.props.leftButton) {
      const leftButton = React.cloneElement(
        this.props.leftButton,
        { style: s.leftButton }
      )
      return leftButton
    } else {
      return
    }
  }

  createRightButton () {
    // take button given as prop and give it styling
    if (this.props.rightButton) {
      const rightButton = React.cloneElement(
        this.props.rightButton,
        { style: s.rightButton }
      )
      return rightButton
    } else {
      return
    }
  }
}

