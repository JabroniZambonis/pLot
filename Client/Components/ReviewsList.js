import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Review from './Review'

export default ReviewList = (props) => {

  const createReview = () => {
    props.navigator.push({
      name: 'CreateReview',
      locationId: props.locationId,
      currentUser: props.currentUser
    })
  }

  return (
    <View>
      <View>
        <TouchableHighlight onPress={createReview}>
          <Text>Create Review</Text>
        </TouchableHighlight>
      </View>
      {!props.reviews ?

        <Text>No Reviews Yet</Text> :

        props.reviews.map((review, key) => (
          <Review 
            rating={review.rating}
            content={review.content}
            key={key}
          />
        ))
      }
    </View>
  )
}