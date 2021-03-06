import React, {useEffect, useCallback} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../HeaderButton';
import {useSelector, useDispatch} from 'react-redux';

import DefaultText from '../DefaultText';
import {toggleFavorite} from '../../store/actions/meals';

const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId),
  );
  const availableMeals = useSelector((state) => state.meals.meals);
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({toggleFav: toggleFavoriteHandler});
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite});
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={{...styles.mealRow, ...styles.mealDetail}}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>

      <View style={styles.checkItems}>
        <DefaultText>
          <Icon
            name={selectedMeal.isGlutenFree ? 'check' : 'close'}
            size={18}
          />{' '}
          Gluten Free
        </DefaultText>
        <DefaultText>
          <Icon name={selectedMeal.isVegan ? 'check' : 'close'} size={18} />{' '}
          Vegan
        </DefaultText>
        <DefaultText>
          <Icon
            name={selectedMeal.isVegetarian ? 'check' : 'close'}
            size={18}
          />{' '}
          Vegetarian
        </DefaultText>
        <DefaultText>
          <Icon
            name={selectedMeal.isLactoseFree ? 'check' : 'close'}
            size={18}
          />{' '}
          Lactose Free
        </DefaultText>
      </View>

      <View style={styles.detailText}>
        <Text style={styles.title}> Ingredients: </Text>
        {selectedMeal.ingredients.map((ingredient) => (
          <DefaultText key={ingredient} style={styles.listItem}>
            {ingredient}
          </DefaultText>
        ))}

        <Text style={styles.title}> Steps: </Text>
        {selectedMeal.steps.map((step) => (
          <DefaultText key={step} style={styles.listItem}>
            {step}
          </DefaultText>
        ))}
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: navigationData.navigation.getParam('mealTitle'),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Fav"
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealRow: {
    flexDirection: 'row',
    backgroundColor: '#dff2f1',
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
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginBottom: 3,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
  detailText: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  listItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  checkItems: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default MealDetailScreen;
