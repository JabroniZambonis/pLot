import React, { Component } from 'react'
import { View } from 'react-native'
import Review from './Review'

export default class ReviewList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: false
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
        {!this.state.reviews

          ?
          
          <Text>Loading... </Text>

          :

          this.state.reviews.map((review) => (
            <Review 
              rating={review.rating}
              review={review.review}
            />
          ))
        }
      </View>
    )
  }
}