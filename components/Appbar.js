import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {Image, Linking, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import userHelp from './userhelp'


const AppBar = () => {
    const navigation = useNavigation();


  return (
    <Appbar.Header theme={{colors: {primary: '#112339'}}}>
      <Appbar.Action icon="menu" />
      <Appbar.Content title="Camao" />
      <Appbar.Action icon='help-circle' onPress={() =>  navigation.navigate('userhelp') }/>
      <Appbar.Action
        icon="logout"
        onPress={async () => {
            await AsyncStorage.setItem('@login', 'false').then(() =>
              navigation.navigate('Login'),
            );
          }}      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '58%',
    height: '100%',
    marginLeft: '10%',
    marginRight: '10%',
  },
});

export default AppBar;