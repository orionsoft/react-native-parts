import React from 'react'
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native'
import PropTypes from 'prop-types'
import {ImagePicker} from 'expo'
import autobind from 'autobind-decorator'
import uploadFile from './uploadFile'
import styles from './styles'
import {Circle} from 'react-native-progress'

export default class ImagePickerField extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    uploadURL: PropTypes.string.isRequired,
    value: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string
  }

  state = {}

  @autobind
  async upload(uri) {
    this.setState({loading: true, errorMessages: null, preview: uri})
    try {
      const url = await uploadFile(uri, this.props.uploadURL)
      this.props.onChange({url})
    } catch (error) {
      console.log('GraphQL error:', error)
    }
    this.setState({loading: false})
  }

  @autobind
  async pick() {
    if (this.state.loading) return
    if (this.props.value) {
      Alert.alert(
        'Delete file',
        'Do you want to delete this file',
        [
          {text: 'Cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'OK',
            onPress: () => {
              this.props.onChange(null)
              this.setState({preview: null})
            }
          }
        ],
        {cancelable: true}
      )
    } else {
      let result = await ImagePicker.launchImageLibraryAsync()
      if (!result.uri) return
      await this.upload(result.uri)
    }
  }

  getValue() {
    return this.props.value ? this.props.value.url : null
  }

  renderBottom() {
    if (this.props.bottom) return
    return <View style={styles.bottomLine} />
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
  }

  renderPreview() {
    const uri = this.state.preview || this.getValue()
    if (uri) {
      return <Image source={{uri}} style={styles.image} />
    } else {
      return <View style={styles.placeholder} />
    }
  }

  renderLoading() {
    if (!this.state.loading) return
    return <Circle size={30} indeterminate color="#111" style={styles.loading} />
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pick}>
          <View style={styles.flex}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
            <View style={styles.imageContainer}>
              {this.renderLoading()}
              {this.renderPreview()}
            </View>
          </View>
        </TouchableOpacity>
        {this.renderErrorMessage()}
        {this.renderBottom()}
      </View>
    )
  }
}
