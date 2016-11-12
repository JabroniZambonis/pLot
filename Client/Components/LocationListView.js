import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native'
import styles  from '../Style/style.js'
import LocationListItem from './LocationListItem'

export default class LocationListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nearbyLocations: [],
      modalVisible: false
    }
    this.setModalVisible = this.setModalVisible.bind(this)
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

  render () {
    let buttonText = this.state.modalVisible ? 'Show Map' : 'List'

    return (
      <View>
        <View style={styles.listViewToggleContainer}>
          <TouchableHighlight
            onPress={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <Text style={styles.listViewToggleText}>{buttonText}</Text>
          </TouchableHighlight>
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
                />
              ))}
            </ScrollView>
            <View style={styles.listViewCloseContainer}>
              <TouchableHighlight
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
              >
                <Text style={styles.listViewCloseText}>{buttonText}</Text>
              </TouchableHighlight> 
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}