import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import AddProduct from './addproduct';
import MainScreen from './mainScreen'
import cart from './cart';

export default function BottomNav() {
  // const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="MainScreen"
      barStyle={{backgroundColor: '#112339'}}>
       
      <Tab.Screen
        name="addproduct"
        component={AddProduct}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Add Product',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={cart}
        options={{
          headerMode: 'none',
          headerShown: false,
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      /> 
    </Tab.Navigator>
  );
}