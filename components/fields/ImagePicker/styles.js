import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5'
  },
  flex: {
    flexDirection: 'row'
  },
  labelContainer: {
    justifyContent: 'center',
    paddingRight: 10,
    padding: 10,
    flex: 1
  },
  label: {
    color: '#111',
    fontSize: 18
  },
  imageContainer: {
    justifyContent: 'center',
    paddingRight: 10
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  loading: {
    position: 'absolute',
    zIndex: 10
  },
  placeholder: {
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    borderRadius: 15
  },
  bottomLine: {
    backgroundColor: '#eee',
    width: '100%',
    height: 1,
    marginLeft: 10
  },
  errorMessage: {
    padding: 10,
    paddingTop: 0,
    color: 'red',
    textAlign: 'right'
  }
})
