import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const DefaultText = (props) => {
  return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    marginLeft: 4,
  },
});

export default DefaultText;
