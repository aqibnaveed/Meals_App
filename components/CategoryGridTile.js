import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

import {useSelector} from 'react-redux';
import DefaultText from './DefaultText';

const CategoryGridTile = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  const avaialableMeals = useSelector((state) => state.meals.filteredMeals);
  const catId = props.catId;
  const totalMeals = avaialableMeals.filter(
    (meals) => meals.categoryIds.indexOf(catId) >= 0,
  );

  return (
    <View style={styles.gridItem}>
      <TouchableComponent style={{flex: 1}} onPress={props.onSelect}>
        <View
          style={{
            ...styles.categoryContainer,
            ...{backgroundColor: props.color},
          }}>
          <Text style={styles.title}>{props.title}</Text>
          <DefaultText
            style={{
              backgroundColor: 'black',
              padding: 8,
              color: props.color,
              borderRadius: 6,
            }}>
            {totalMeals.length} items
          </DefaultText>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    height: 150,
    //overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
    elevation: 15,
  },
  categoryContainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
    margin: 10,
    textAlign: 'center',
  },
});

export default CategoryGridTile;
