import React, { Component } from 'react'
import { View, TextInput, Text, TouchableHighlight, Slider, StyleSheet } from 'react-native'

export default class CreateReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
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
      this.props.navigator.popN(2)
    })
    .catch((err) => {
      console.log('review not created: ',err)
    })    
  }

  render () {
    return (
      <View style={style.formContainer}>
        <Text>Tell us your thoughts</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.contentInput}
            onChange={(event) => this.setState({content: event.nativeEvent.text})}
          />
        </View>
        <Slider 
          maximumValue={5}
          minimumValue={0}
          step={1}
          onValueChange={(value) => this.setState({rating: value})}
        />
        <Text>{this.state.rating}</Text>
        <TouchableHighlight onPress={this.createReview}>
          <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const style = StyleSheet.create({
  formContainer: {
    padding: 10
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#64AFCB',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  contentInput: {
    height: 200,
  }
})