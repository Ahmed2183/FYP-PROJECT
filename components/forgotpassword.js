import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
//import firebase from '../database/firebase';


export default class Signup extends Component {

 constructor() {
    super();
    this.state = { 
      email: '', 
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

 forgotPassword = () => {
        if(this.state.email === '' ) {
      alert('Enter Your Email!')
      


    }
    else
    {

    firebase.auth().sendPasswordResetEmail(this.state.email)
      .then(function (user) {
        alert('Password reset email sent!')
        
      })
       
      .catch(function (e) {
        alert(e)
        
      })
  }
 }

 updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


       
     render() {
    return (
      

      <View style={styles.container}>  

      <Text  style={styles.logo1} > Please Enter Your Email </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput1}
          placeholder="Email"
          placeholderTextColor="black"
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          
        />
      </View>   
      
        <TouchableOpacity style={styles.loginBtn1} 
         onPress={() => this.forgotPassword()}
         >
        <Text style={{fontWeight:'bold'}}>RESET PASSWORD</Text>
      </TouchableOpacity>


      <View>
        <Text style={{padding:30,alignItems:'center',justifyContent:'center',textAlign:"center", fontWeight:'bold', color:'#D49A9A',fontSize: 15,}}> --- OR ---</Text>
      </View>

        
 <TouchableOpacity style={styles.loginBtn1} 
         onPress={() => this.props.navigation.navigate('Login')}
         >
        <Text style={{fontWeight:'bold'}}>Click Here To Login</Text>
      </TouchableOpacity>
        

        
        </View>

           );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 30,
    backgroundColor: '#C0C0C0',
    
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "black",
    borderBottomWidth: 2
  },
  loginText: {
    color: '#3740FE',
    marginTop: 10,
    textAlign: 'center',
    fontSize:18,
    
    
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#112339',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"gray",
    marginBottom:40,
  },

  loginText1: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    padding:10,
    fontSize:18
  },
   container1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo1:{
    fontSize:30,
    color:"white",
    marginBottom:40,
    shadowColor: '#D49A9A',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#D49A9A",
    borderRadius: 30,
    width: "80%",
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
    width: "80%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowRadius: 10 ,
    backgroundColor: '#FFFFFF',
    shadowColor: '#9D0F15',
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset : { width: 1, height: 5},
    },
  
});