import {createStore, combineReducers} from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/setAvatar'
import{persistCombineReducers} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
