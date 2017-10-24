import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 49, // Default tab bar height in iOS 10
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .3)',
    backgroundColor: 'transparent', // Default background color in iOS 10,
    flexDirection: 'row'
  },
  blur: {
    flex: 1,
    backgroundColor: 'red'
  },
  tab: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  icon: {
    flexGrow: 1
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: 'transparent'
  }
})
