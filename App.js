import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgotpassword';
import UserHelp from './components/userhelp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './components/BottomNav'
import Electronic from './Screen/Electronic';
import Furnicher from './Screen/Furnicher'
import Bags from './Screen/Bags'
import Accessories from './Screen/Accessories'
import Gaming from './Screen/Gaming'
import HouseHold from './Screen/HouseHold'
import CheckOut from './components/CheckOut';
import Agrment from './components/Agrment';



const Stack = createStackNavigator();

function MyStack({initalScreen}) {
  return (
    <Stack.Navigator
      initialRouteName={initalScreen}
      screenOptions={{
        headerMode: null,
        headerStyle: {
          backgroundColor: 'Black',
        },
        headerTintColor: 'Black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({title: 'Login'}, {headerShown: false})}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({title: 'Signup'}, {headerShown: false})}
      />
     
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={({title: 'forgotpassword'}, {headerShown: false})}
      />

      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={( {headerShown: false})}
      />

      <Stack.Screen
        name="userhelp"
        component={UserHelp}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="electronic"
        component={Electronic}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="furnicher"
        component={Furnicher}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="bags"
        component={Bags}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="accessories"
        component={Accessories}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="gaming"
        component={Gaming}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
      <Stack.Screen
        name="household"
        component={HouseHold}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
      <Stack.Screen
        name="checkout"
        component={CheckOut}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
       <Stack.Screen
        name="agrment"
        component={Agrment}
        options={({title: 'userhelp'}, {headerShown: false})}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initalScreen, setInitialScreen] = React.useState(null);
  const getLoginStatus = async () => {
    return await AsyncStorage.getItem('@login').then(item =>
      item !== null ? (item == 'true' ? 'BottomNav' : 'Login') : 'Login',
    );
  };
  React.useEffect(() => {
    getLoginStatus().then(status => setInitialScreen(status));
  }, []);

  return (
    initalScreen && (
      <NavigationContainer>
        <MyStack initalScreen={initalScreen} />
      </NavigationContainer>
    )
  );
}
