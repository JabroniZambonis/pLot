const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { View, TextInput, Text, TouchableHighlight, Slider, StyleSheet} from 'react-native'
import serverURL from '../Lib/url'
import Button from 'apsl-react-native-button'

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
    fetch(`${serverURL}/locations/${this.props.locationId}/reviews`, {
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
        <Text style={style.createFormHeader}>Review the spot</Text>
        <View style={style.inputContainer}>
          <TextInput
            style={style.contentInput}
            multiline={true}
            onChange={(event) => this.setState({content: event.nativeEvent.text})}
            placeholder={'Give us your feedback on the spot...'}
          />
          <Slider 
            maximumValue={5}
            minimumValue={0}
            step={1}
            onValueChange={(value) => this.setState({rating: value})}
          />
          <Text>{this.state.rating}</Text>
        </View>
        <View style={{ flexDirection:'row',justifyContent:'center'}}>
          <Button
            onPress={this.createReview}
            style={styles.reviewsButton}
            textStyle={styles.reviewButtonText}
          >Submit
          </Button>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  createFormHeader: {
  textAlign: 'center',
  fontSize: 22,
  height: 50,
  color: '#ffa500',
  fontWeight: 'bold',
  alignItems: 'center'
  },

  formContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#efefef'
  },

  contentInput: {
    borderRadius: 10,
    borderColor: '#64AFCB',
    borderWidth: 1,
    height: 200,
    fontSize: 16,
    paddingLeft: 10,
    backgroundColor: 'white',
    color: '#64AFCB'
  }
})