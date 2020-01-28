import React from 'react';
import {Animated, View} from 'react-native';

class EnlargeShrink extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    }
  }
  _getSize(){
    if(this.props.shouldEnlarge){
      return 80
    }
    else {
      return 40
    }
  }
  componentDidUpdate(){
    Animated.spring(
      this.state.viewSize,
      {
        toValue: this.props.shouldEnlarge == true ? 80 : 40
      }
    ).start();
  }

  render(){
    return(
      <Animated.View
        style={{height: this.state.viewSize, width: this.state.viewSize}}
      >
        {this.props.children}
      </Animated.View>
    )
  }

}

export default EnlargeShrink
