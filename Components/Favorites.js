import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Favorites extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    return(
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar/>
        </View>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          isFavorite='true'
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  avatar_container: {
    alignItems: 'center'
  },
  main_container: {
   flex: 1
 }
})
const mapStateToProps = (state) => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm}
}
export default connect(mapStateToProps)(Favorites)
