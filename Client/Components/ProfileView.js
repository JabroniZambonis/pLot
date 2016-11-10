const styles = require('../Style/style.js')

import React, { Component } from 'react'
import { Image, TouchableHighlight, Text, StyleSheet, View, Modal, TextInput } from 'react-native'

export default class HomeMap extends Component {
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

  render () {
    console.log("ProfileView.js this.props: ", this.props.currentUser.photo)
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
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{marginLeft: 22, backgroundColor: 'white'}}>
            <Text>TEST</Text>
          </View>
        </Modal>
      </View>
    )
  }
}
