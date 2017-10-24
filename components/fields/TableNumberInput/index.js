import React from 'react'
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native'
import styles from './styles.js'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import numeral from 'numeral'

export default class TableTextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number,
    label: PropTypes.string,
    passProps: PropTypes.object,
    bottom: PropTypes.bool,
    errorMessage: PropTypes.string,
    format: PropTypes.string
  }

  static defaultProps = {
    label: 'Input',
    format: '0,0'
  }

  state = {}

  @autobind
  focus() {
    this.refs.input.focus()
  }

  @autobind
  onBlur() {
    const text = this.state.value
    const value = text === '' ? undefined : numeral._.stringToNumber(text)
    this.props.onChange(value)
    this.setState({value: numeral(value).format(this.props.format)})
  }

  @autobind
  onChange(value) {
    this.setState({value})
  }

  renderBottom() {
    if (this.props.bottom) return
    return <View style={styles.bottomLine} />
  }

  renderErrorMessage() {
    if (!this.props.errorMessage) return
    return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View style={styles.flex}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{this.props.label}</Text>
            </View>
            <TextInput
              ref="input"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              blurOnSubmit
              onBlur={this.onBlur}
              value={this.state.value}
              onChangeText={this.onChange}
              {...this.props.passProps}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.renderErrorMessage()}
        {this.renderBottom()}
      </View>
    )
  }
}
