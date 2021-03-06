import React from 'react';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {CATEGORIES} from '../../data/dummy-data';
import MealItem from '../MealItem';
import MealList from '../MealList';
import DefaultText from '../DefaultText';

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam('categoryId');

  const avaialableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = avaialableMeals.filter(
    (meals) => meals.categoryIds.indexOf(catId) >= 0,
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText style={{textAlign: 'center', color: 'gray'}}>
          {' '}
          No meals for the selected filters!
        </DefaultText>
      </View>
    );
  } else {
    return (
      <MealList mealsData={displayedMeals} navigation={props.navigation} />
    );
  }
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealsScreen;
