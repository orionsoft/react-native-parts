import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles.js'

export default class Card extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.any,
    text: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {}

  renderCard() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image style={styles.image} source={this.props.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.text}>{this.props.text}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    if (this.props.onPress) {
      return <TouchableOpacity onPress={this.props.onPress}>{this.renderCard()}</TouchableOpacity>
    } else {
      return this.renderCard()
    }
  }
}
