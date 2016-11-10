const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'
import FBlogin from './FBlogin'

export default class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible (visible) {
    this.setState({modalVisible: visible})
  }

  finishedLogout (error, result) {
    this.props.logOut()
  }

  render () {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <Image
            style={styles.profileImageButton}
            source={{uri: this.props.currentUser.photo}}
          />
        </TouchableHighlight>

        <Modal
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{marginTop: 22}} >
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            <FBlogin logOut={this.props.logOut} reanimator={this.props.reanimator}/>
          </View>
        </Modal>
      </View>
    )
  }
}
