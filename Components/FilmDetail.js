import React from 'react';
import {Platform, Alert, Share, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button, TouchableOpacity} from 'react-native';
import { getFilmDetailFromApi, getBackDropImageFromApi } from '../API/TMDBApi'
import Moment from 'moment';
import Numeral from 'numeral';
import {connect} from 'react-redux';
import EnlargeShrink from '../Animations/EnlargeShrink';

class FilmDetail extends React.Component{
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    return{
      headerRight:(
        <TouchableOpacity
          onPress={()=>params.shareFilms()}
        >
          <Image
            style={styles.share_image}
            source={require('../Images/ic_sharetest.png')}
          />
        </TouchableOpacity>
      )
    }
  }
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      film: undefined
    }
    this._shareFilm = this._shareFilm.bind(this)
  }

  _updateNavigationParams(){
    this.props.navigation.setParams({
      shareFilms: this._shareFilm,
      film: this.state.film
    })
  }

  componentDidMount(){
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data=>{
      this.setState({
        film: data,
        isLoading: false
      }, ()=>{this._updateNavigationParams()})
    })
  }

  _toggleFavorite(){
    const action = {type: "TOGGLE_FAVORITE", value:this.state.film}
    this.props.dispatch(action)
  }

  _displayLoading(){
    if(this.state.isLoading){
      console.log("ActivityIndicator render");
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size="large"/>
        </View>
      )
    }
  }

  _displayFavoriteImage(){
    var sourceImage = require('../Images/ic_favorite_border.png');
    shouldEnlarge = false;
    if(this.props.favoritesFilm.findIndex(item=>item.id === this.state.film.id) !== -1)
    {
      sourceImage = require('../Images/ic_favorite.png');
      shouldEnlarge = true;
    }
    return(
      <EnlargeShrink shouldEnlarge={shouldEnlarge}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      </EnlargeShrink>
    )
  }

  _displayFilm(){
    if(this.state.film != undefined)
    {
      const {film} = this.state;
      console.log(this.props)
      return(

        <ScrollView style={{flex:1}}>
          <Image
            source={{uri:getBackDropImageFromApi(this.state.film.backdrop_path)}}
            style={{height:169, margin: 5}}
          />
          <View style={styles.title_container}>
            <Text style={styles.title}>{this.state.film.title}</Text>
            <TouchableOpacity onPress={()=>this._toggleFavorite()}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
          </View>
          <Text style={styles.overview}>{this.state.film.overview}</Text>
          <View style={styles.rowDirection}>
            <Text>Sortie le: </Text>
            <Text>{Moment(this.state.film.release_date).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.rowDirection}>
            <Text>Note: </Text>
            <Text>{film.vote_average}</Text>
          </View>
          <View style={styles.rowDirection}>
            <Text>Nombre de vote: </Text>
            <Text>{film.vote_count}</Text>
          </View>
          <View style={styles.rowDirection}>
            <Text>Budget: </Text>
            <Text>{Numeral(film.budget).format('0,0[.]00 $')}</Text>
          </View>
          <View style={styles.rowDirection}>
            <Text>Genre(s): </Text>
            <Text>{film.genres.map(function(genre){
              return genre.name;}).join("/")}</Text>
          </View>
        </ScrollView>
      )
    }
  }

  _shareFilm(){
    const {film} = this.state
    Share.share({title: film.title, message: film.overview})
      .then(
        Alert.alert(
          'Succès',
          'Film partagé',
          [
            {text: 'OK', onPress:()=>{}},
          ]
        )
      )
      .catch(err=>
        Alert.alert(
          'Echec',
          'Film non partagé',
          [
            {text: 'OK', onPress:()=>{}},
          ]
        ))
  }

_displayFloatingActionButton(){
    const {film} = this.state
    if(film != undefined && Platform.OS === 'android'){
      return(
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={()=>this._shareFilm()}>
          <Image
          style={styles.share_image}
            source={require('../Images/ic_share.png')}
          />
        </TouchableOpacity>

      )
    }
  }

  render(){
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex:1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_container:{
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  title:{
    fontSize: 30
  },
  overview:{
    fontStyle: 'italic'
  },
  rowDirection:{
    flexDirection: 'row'
  },
  margin_text:{
    marginRight: 5,
    marginLeft: 5
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm}
}

export default connect(mapStateToProps)(FilmDetail);
