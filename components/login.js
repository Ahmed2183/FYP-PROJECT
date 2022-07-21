import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
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

  //const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

  userLogin = async () => {
    if (this.state.email === '' && this.state.password === '') {
      alert('Enter Your Email and Password! ');
    } else if (this.state.email === '') {
      alert('Enter your Email! abc123@example.com ');
      this.setState({
        isLoading: false,
        email: '',
        password: '',
      });
    } else if (this.state.password === '') {
      alert('Enter your Password!');
    } else if (
      this.state.email === 'admin123@gmail.com' &&
      this.state.password === 'Admin123'
    ) {
      alert('Admin logged-in successfully!');
      await AsyncStorage.setItem('@login', true).then(() =>
        this.props.navigation.navigate('BottomNav'),
      );

      this.setState({
        email: '',
        password: '',
      });
    } else {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async res => {
          console.log(res);
          alert('User logged-in successfully!');
          this.setState({
            email: '',
            password: '',
          });
          //alert('User logged-in successfully!')
          // .catch(error => this.setState({ errorMessage: error.message }))

          //alert(this.setState.errorMessage)
          await AsyncStorage.setItem('@login', 'true').then(() =>
            this.props.navigation.navigate('BottomNav'),
          );
        })

        .catch(function (e) {
          alert(e);
        });
    }
  };

  googleLogin = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential

      if ((await auth().signInWithCredential(googleCredential)) != null) {
        await AsyncStorage.setItem('@login', 'true').then(() =>
          this.props.navigation.navigate('BottomNav'),
        )
        .then((response) => {
        console.log(response.value)

        })
      }
    } catch (error) {
      alert(error);
    }
  };
  fbLogin = async () => {
    try {
      // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
 if ((await auth().signInWithCredential(facebookCredential)) != null) {
  await AsyncStorage.setItem('@login', 'true').then(() =>
  this.props.navigation.navigate('BottomNav'),
);
 }
    }  catch(error) {
      alert(error);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9D0F15" />
        </View>
      );
    }
    GoogleSignin.configure({
      webClientId:
        '465123482645-de4jal09udvm9muml2qei7av445029e1.apps.googleusercontent.com',
    });

    return (
      <View style={styles.container1}>
        <Text style={styles.logo1}> CAMAO </Text>

        <View>
          <Text></Text>
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

        <Text
          style={styles.forgot_button1}
          onPress={() => this.props.navigation.navigate('forgotpassword')}>
          Forgot Password?
        </Text>

        <View>
          <Text></Text>
        </View>
        <View>
          <Text></Text>
        </View>

        <TouchableOpacity
          style={styles.loginBtn1}
          onPress={() => this.userLogin()}>
          <Text style={{fontWeight: 'bold'}}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn1}
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={({fontfamily: 'poppins'}, {fontWeight: 'bold'})}>
            SIGNUP
          </Text>
        </TouchableOpacity>
         
        <SocialIcon
        style={styles.googlebtn}
        title='Sign In With Google'
        button
        type='google'
        fontFamily='poppins'
        fontWeight= 'bold'
        onPress={() =>
        this.googleLogin().then(() => console.log('Signed in with Google!'))}
        />

        <SocialIcon
        style={styles.googlebtn}
        title='Sign In With Facebook'
        button
        type='facebook'
        fontFamily='poppins'
        fontWeight= 'bold'
        onPress={() =>
        this.fbLogin().then(() => console.log('Signed in with FaceBook!'))}
        />
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
    backgroundColor: '#FFFFFF',
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
    color: '#9D0F15',
    marginTop: 25,
    textAlign: 'center',
    padding: 10,
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
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  container1: {
    flex: 1,
    backgroundColor: '#112339',
    alignItems: 'center',
    justifyContent: 'center',
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

  forgot_button1: {
    height: 30,
    marginBottom: 30,
    fontWeight: '600',
    fontFamily: 'Comic Sans MS',
    color: '#D49A9A',
    fontSize: 15,
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
    shadowOpacity: 3,
    elevation: 3,
    shadowOffset: {width: 1, height: 2},
  },
  googlebtn: {
    width: '80%', 
    height: 50, 
    marginTop: 20,
    shadowOpacity: 3,
    elevation: 3,
    shadowOffset: {width: 1, height: 5},
    borderRadius: 25,
  },
  logo1: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginBottom: 40,
    fontFamily: 'San Francisco',
    shadowColor: '#D49A9A',
  },
});
