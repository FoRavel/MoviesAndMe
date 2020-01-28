import React from 'react'
import {StyleSheet, FlatList, Text} from 'react-native'
import FilmItem from './FilmItem'

class FilmList extends React.Component{
  _displayDetailForFilm = (idFilm) => {

    this.props.navigation.navigate("FilmDetail",{idFilm: idFilm});
  }
  render(){
    return(
      <FlatList
         style={styles.list}
         data={this.props.films}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({item}) => (
           <FilmItem
             film={item}
             displayDetailForFilm={this._displayDetailForFilm}
           />
         )}
         onEndReachedThreshold={0.5}
         onEndReached={() => {
           if(this.props.isFavorite == 'false'){
             if (this.props.films.length > 0 && this.props.page < this.props.totalPages) {
               this.props.loadFilms()
             }
           }

         }}
       />
    )
  }
}

const styles = StyleSheet.create({
  list:{
    flex: 1
  }
})

/*
const mapStateToProps = state =>{
  return{
    favoritesFilm: state.favoritesFilm
  }
}
*/

export default FilmList
