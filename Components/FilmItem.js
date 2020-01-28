import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {getImageFromApi} from '../API/TMDBApi';
import {connect} from 'react-redux';
import FadeIn from '../Animations/FadeIn';

class FilmItem extends React.Component{
  _toggleFavorite(film){
    const action = {type:'TOGGLE_FAVORITE', value: film}
    this.props.dispatch(action)
  }
  _displayFavoriteImage(filmId){
    var sourceImage = require('../Images/ic_favorite_border.png')
    if(this.props.favoritesFilm.findIndex(item=>item.id === filmId) !== -1){
      sourceImage = require('../Images/ic_favorite.png')
    }
    return(
      <Image
        style={styles.image_favorite}
        source={sourceImage}
      />
    )
  }
  render(){
    const {film, displayDetailForFilm} = this.props;
    return(
      <FadeIn>
      <TouchableOpacity style={styles.main_container} onPress={()=> displayDetailForFilm(film.id)} >
        <Image
          style={{width: 100, height: 150, margin: 5}}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content}>
          <View style={styles.header}>
          <TouchableOpacity onPress={()=>this._toggleFavorite(film)}>
            {this._displayFavoriteImage(film.id)}
          </TouchableOpacity>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text numberOfLines={6} >{film.overview}</Text>
          </View>
          <View style={{flex:1}}>
            <Text>Date</Text>
          </View>
        </View>
      </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 150,
    flexDirection: 'row',
    margin: 5
  },
  content:{
    flexDirection: 'column',
    flex: 1
  },
  header:{
    flexDirection: 'row',
    flex: 3
  },
  title_text:{
    flex:2,
    paddingRight: 5
  },
  description_container: {
    flex: 7
  },
  image_favorite:{
    width: 40,
    height: 40
  }
})

const mapStateToProps = (state) => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm}
}

export default connect(mapStateToProps)(FilmItem);
