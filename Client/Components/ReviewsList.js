import React, { Component } from 'react'
import { View } from 'react-native'

export default class ReviewList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: []
    }
  }

  componentDidMount () {
    this.setState({
      reviews: this.props.reviews
    })
  }

  render () {
    return (
      <View>
      </View>
    )
  }
}