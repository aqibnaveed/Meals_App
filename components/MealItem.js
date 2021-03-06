import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import DefaultText from '../components/DefaultText';

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{...styles.mealRow, ...styles.mealTitle}}>
            <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
              <Text numberOfLines={1} style={styles.mealTitleText}>
                {props.title}
              </Text>
            </ImageBackground>
          </View>
          <View style={{...styles.mealRow, ...styles.mealDetail}}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
    backgroundColor: '#dff2f1',
  },
  mealItem: {
    height: 200,
    width: '100%',
  },
  mealTitle: {
    height: '85%',
    justifyContent: 'center',
  },
  mealDetail: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    elevation: 5,
  },
  mealTitleText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default MealItem;
