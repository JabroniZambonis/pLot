import React, { Component } from 'react'
import { View, Text, Modal, TouchableHighlight } from 'react-native'
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
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible} 
        >
          <View style={styles.listViewContainer}>
            { !this.state.nearbyLocations.length ? 
                <Text>Loading</Text> :

              this.state.nearbyLocations.map((location, key) => (
              <LocationListItem
                location={location}
                key={key}
              />
            ))}
            <TouchableHighlight
              onPress={() => this.setModalVisible(!this.state.modalVisible)}
            >
              <Text style={styles.listViewToggle}>{buttonText}</Text>
            </TouchableHighlight> 
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <Text style={styles.listViewToggle}>{buttonText}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}