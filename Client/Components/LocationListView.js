import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import styles  from '../Style/style.js'
import LocationListItem from './LocationListItem'
import Button from 'apsl-react-native-button'

export default class LocationListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nearbyLocations: [],
      modalVisible: false,
      buttonPress: false
    }
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setButtonStyle = this.setButtonStyle.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      nearbyLocations: nextProps.nearbyLocations
    })
  }

  setModalVisible (visible) {
    console.log('nearbyLocations: ',this.props.nearbyLocations)
    this.setState({
      modalVisible: visible
    })
  }

  setButtonStyle (style) {
    this.setState({
      buttonPress: style
    })
  }

  render () {
    let buttonText = this.state.modalVisible ? 'Show Map' : 'List'
    let listButtonStyle = this.state.buttonPress ? styles.listViewToggleContainerPress : styles.listViewToggleContainer
    let mapButtonStyle = this.state.buttonPress ? styles.listViewCloseContainerPress : styles.listViewCloseContainer

    return (
      <View>
        <View>
          <Button style={listButtonStyle}
          textStyle={styles.listViewToggleText} 
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
          onPressIn={() => this.setButtonStyle(!this.state.buttonPress)} 
          onPressOut={() => this.setButtonStyle(!this.state.buttonPress)}
          activeOpacity={1}>
          {buttonText}
          </Button>
        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible} 
        >
          <View style={styles.listViewContainer}>
            <ScrollView
              directionalLockEnabled={true}
              contentContainerStyle={styles.scrollModal}
            >
              { !this.state.nearbyLocations.length ? 
                  <Text>Loading</Text> :

                this.state.nearbyLocations.map((location, key) => (
                <LocationListItem
                  location={location}
                  key={key}
                  navigator={this.props.navigator}
                  setModalVisible={this.setModalVisible.bind(this)}
                  modalState={this.state.modalVisible}
                />
              ))}
            </ScrollView>
            <View>
              <Button style={mapButtonStyle}
                textStyle={styles.listViewToggleText} 
                onPress={() => this.setModalVisible(!this.state.modalVisible)} 
                onPressIn={() => this.setButtonStyle(!this.state.buttonPress)} 
                onPressOut={() => this.setButtonStyle(!this.state.buttonPress)}
                activeOpacity={1}>
                {buttonText}
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}