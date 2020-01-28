import React from 'react';
import {StyleSheet, View} from 'react-native';

class ColorBlocks extends React.Component{
  render(){
    return(
      <View style={{alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', flex: 1}}>
        <View style={[{backgroundColor: 'blue'}, styles.heightAndWidth]}></View>
        <View style={[{backgroundColor: 'white'}, styles.heightAndWidth]}></View>
        <View style={[{backgroundColor: 'red'}, styles.heightAndWidth]}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heightAndWidth: {
    height: 50,
    width: 50
  }
});

export default ColorBlocks;
