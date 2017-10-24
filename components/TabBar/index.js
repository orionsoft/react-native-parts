import React, {PureComponent} from 'react'
import {Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import TabBarIcon from './TabBarIcon'
import styles from './styles'
import PropTypes from 'prop-types'
import {BlurView} from 'expo'

export default class TabBarBottom extends PureComponent {
  // See https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/UIKitUICatalog/UITabBar.html
  static defaultProps = {
    activeTintColor: '#3478f6', // Default active tint color in iOS 10
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true
  }

  static propTypes = {
    position: PropTypes.any,
    navigation: PropTypes.object,
    activeTintColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
    labelStyle: PropTypes.any,
    showLabel: PropTypes.bool,
    getLabel: PropTypes.func,
    renderIcon: PropTypes.func,
    showIcon: PropTypes.bool,
    jumpToIndex: PropTypes.func,
    activeBackgroundColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    style: PropTypes.any,
    tabStyle: PropTypes.any
  }

  _renderLabel = scene => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      labelStyle,
      showLabel
    } = this.props
    if (showLabel === false) {
      return null
    }
    const {index} = scene
    const {routes} = navigation.state
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x: *, i: number) => i)]
    const outputRange = inputRange.map(
      (inputIndex: number) => (inputIndex === index ? activeTintColor : inactiveTintColor)
    )
    const color = position.interpolate({
      inputRange,
      outputRange: (outputRange: Array<string>)
    })

    const tintColor = scene.focused ? activeTintColor : inactiveTintColor
    const label = this.props.getLabel({...scene, tintColor})
    if (typeof label === 'string') {
      return <Animated.Text style={[styles.label, {color}, labelStyle]}>{label}</Animated.Text>
    }

    if (typeof label === 'function') {
      return label({...scene, tintColor})
    }

    return label
  }

  _renderIcon = scene => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon
    } = this.props
    if (showIcon === false) {
      return null
    }
    return (
      <TabBarIcon
        position={position}
        navigation={navigation}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        scene={scene}
        style={styles.icon}
      />
    )
  }

  render() {
    const {
      position,
      navigation,
      jumpToIndex,
      activeBackgroundColor,
      inactiveBackgroundColor,
      style,
      tabStyle
    } = this.props
    const {routes} = navigation.state
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x: *, i) => i)]
    return (
      <Animated.View style={[styles.tabBar, style]}>
        <BlurView tint="light" intensity={100} style={[StyleSheet.absoluteFill, styles.blur]} />
        {routes.map((route, index) => {
          const focused = index === navigation.state.index
          const scene = {route, index, focused}
          const outputRange = inputRange.map(
            (inputIndex: number) =>
              inputIndex === index ? activeBackgroundColor : inactiveBackgroundColor
          )
          const backgroundColor = position.interpolate({
            inputRange,
            outputRange: outputRange
          })
          const justifyContent = this.props.showIcon ? 'flex-end' : 'center'
          return (
            <TouchableWithoutFeedback key={route.key} onPress={() => jumpToIndex(index)}>
              <Animated.View style={[styles.tab, {backgroundColor, justifyContent}, tabStyle]}>
                {this._renderIcon(scene)}
                {this._renderLabel(scene)}
              </Animated.View>
            </TouchableWithoutFeedback>
          )
        })}
      </Animated.View>
    )
  }
}
