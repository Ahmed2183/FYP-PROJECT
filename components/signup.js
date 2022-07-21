// components/signup.js

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
//import firebase from '../database/firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (
      this.state.email === '' &&
      this.state.password === '' &&
      this.state.displayName === ''
    ) {
      alert('Enter details to signup!');
      this.setState({
        isLoading: false,
        displayName: '',
        email: '',
        password: '',
      });
    } else if (this.state.email === '' && this.state.displayName === '') {
      alert('Enter Email and DisplayName!');
      this.setState({
        isLoading: false,
        displayName: '',
        email: '',
        password: '',
      });
    } else if (this.state.password === '' && this.state.displayName === '') {
      alert('Enter Password and DisplayName');
    } else if (this.state.email === '' && this.state.password === '') {
      alert('Enter Email and Password!');
    } else if (this.state.email === '') {
      alert('Enter Your Email!');
      this.setState({
        password: '',
      });
    } else if (this.state.password === '') {
      alert('Enter Your password!');
    } else if (this.state.displayName === '') {
      alert('Enter Your DisplayName!');
      this.setState({
        password: '',
      });
    } else {
    
      
        auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          firestore().collection('users').doc().set({
            email: this.state.email,
            password:this.state.password,
            username: this.state.displayName
          })
        )
        .then(res => {
          alert('User registered successfully!');
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
          });
          // .catch(error => this.setState({ errorMessage: error.message }))
          //alert('Please Enter Correct Details to Signup')
          this.props.navigation.navigate('Login');
        })
        .catch(function (e) {
          alert(e);
        });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#87C7D8" />
        </View>
      );
    }
    return (
      <View style={styles.container1}>
        <Text style={styles.logo1}> Register Yourself </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput1}
            placeholder="User Name"
            placeholderTextColor="black"
            value={this.state.displayName}
            onChangeText={val => this.updateInputVal(val, 'displayName')}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput1}
            placeholder="Email"
            placeholderTextColor="black"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, 'email')}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput1}
            placeholder="Password"
            placeholderTextColor="black"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />
        </View>

        <View>
          <Text></Text>
        </View>
        <View>
          <Text></Text>
        </View>

        <TouchableOpacity
          style={styles.loginBtn1}
          onPress={() => this.registerUser()}>
          <Text style={{fontWeight: 'bold'}}>SIGNUP</Text>
        </TouchableOpacity>

        <Text
          style={{alignItems: 'center', fontWeight: 'bold', padding: 20, color:'#D49A9A',fontSize: 15}}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#C0C0C0',
    borderBottomWidth: 2,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  loginText: {
    height: 25,
    marginBottom: 30,
    fontWeight: '600',
    padding: 40,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
    backgroundColor: '#112339',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo1: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginBottom: 40,
    shadowColor: '#D49A9A',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#D49A9A',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 20,
  },
  textInput1: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  loginBtn1: {
    width: '80%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#87C7D8',
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset: {width: 1, height: 5},
  },
});
