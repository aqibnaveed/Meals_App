import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import HeaderButton from '../HeaderButton';
import MealList from '../MealList';
import DefaultText from '../DefaultText';

const FavoritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (!favMeals || favMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText style={{textAlign: 'center', color: 'gray'}}>
          {' '}
          No Favorite meals found. Try adding some!
        </DefaultText>
      </View>
    );
  } else {
    return <MealList mealsData={favMeals} navigation={props.navigation} />;
  }
};

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'FAV!!!!!',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="hamburger"
          iconName="ios-reorder-three-sharp"
          onPress={() => {
            navigationData.navigation.toggleDrawer(); // drawer doesn close............
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default FavoritesScreen;
