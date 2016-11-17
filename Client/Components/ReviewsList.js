import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Review from './Review'

export default ReviewList = (props) => {

  return (
    <View style={style.reviewsListContainer}>
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

const style = StyleSheet.create({
  reviewsListContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#efefef'
  }
})