import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import CategoriesScreen from '../components/screens/CategoriesScreen';
import CategoryMealsScreen from '../components/screens/CategoryMealsScreen';
import MealDetailScreen from '../components/screens/MealDetailScreen';
import FavoritesScreen from '../components/screens/FavoritesScreen';
import FiltersScreen from '../components/screens/FiltersScreen';
import {configureFonts} from 'react-native-paper';

const defaultStackNavOptions = {
  headerTitle: 'NEW Meals App',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '200',
    fontSize: 25,
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const MealsNavigator = createStackNavigator(
  {
    Category: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorite: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return (
          <Icon
            name="restaurant"
            size={25}
            color={focused ? 'white' : 'grey'}
          />
        );
      },
      tabBarColor: Colors.primary,
      tabBarLabel: (
        <Text style={{fontFamily: 'OpenSans-Regular', fontWeight: 'normal'}}>
          Meals
        </Text>
      ),
    },
  },
  Favorites: {
    screen: FavoriteNavigator,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return (
          <Icon name="star" size={25} color={focused ? 'white' : 'grey'} />
        );
      },
      tabBarColor: Colors.favorite,
      tabBarLabel: (
        <Text style={{fontFamily: 'OpenSans-Regular', fontWeight: 'normal'}}>
          Favorites
        </Text>
      ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
      });

const FiltersStackNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  },
);

const MainNavigator = createDrawerNavigator(
  {
    Meals: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'All Meals',
      },
    },
    Filters: FiltersStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.light,
      activeBackgroundColor: Colors.primary,
      activeLabelStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 20,
        fontWeight: 'normal',
      },
      labelStyle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight: 'normal',
      },
    },
  },
);

export default createAppContainer(MainNavigator);
