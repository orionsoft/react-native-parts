import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    shadowColor: '#5c5c5c',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 15,
    margin: 10,
    marginTop: 20,
    marginBottom: 20
  },
  inner: {
    overflow: 'hidden',
    borderRadius: 15
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#eee'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: '700'
  },
  text: {
    color: '#818181',
    marginTop: 5
  }
})
