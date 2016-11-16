import React, { Component } from 'react'
import { View, TextInput, Text, TouchableHighlight, Slider } from 'react-native'

export default class CreateReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: false,
      content: false
    }
    this.createReview = this.createReview.bind(this)
  }

  createReview () {

    let review = {
      rating: this.state.rating,
      content: this.state.content,
      userId: this.props.currentUser._id,
      locationId: this.props.locationId
    }
    fetch(`http://localhost:3000/locations/${this.props.locationId}/reviews`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.userToken
      },
      body: JSON.stringify({
        review: review
      })
    })
    .then(response => response.json())
    .then((res) => {
      console.log(res)
      this.props.navigator.pop()
    })
    .catch((err) => {
      console.log('review not created: ',err)
    })    
  }

  render () {
    return (
      <View>
        <Text>Tell us your thoughts</Text>
        <TextInput
          style={{width: 200, height: 200}}
          onChange={(event) => this.setState({content: event.nativeEvent.text})}
        >
        </TextInput>
        <Slider 
          maximumValue={5}
          minimumValue={0}
          step={1}
          onValueChange={(value) => this.setState({rating: value})}
        />
        <TouchableHighlight onPress={this.createReview}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}