const initialState = {avatar: require('../../Images/ic_tag_faces.png')}

function setAvatar(state = initialState, action){
  let nextState
  switch(action.type){
    case 'SET_AVATAR':
      const requireSource = {uri: action.value.uri}
      nextState =  {...state, avatar: requireSource}
      return nextState || state
    default:
      return state
  }
}

export default setAvatar;
