import React, { Component } from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import{Container, Content, Header, Title, Footer, FooterTab, Left, Right, Body,Card, CardItem, Button} 
from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class UserHelp extends Component {

    render(){

    return(
        <Container>
        <Header style={{backgroundColor: '#112339', height: 60}}>   
        <Left>
        <MaterialIcons
            name="arrow-back-ios"
            size={35}
            color="#D49A9A"
            onPress={() => this.props.navigation.navigate('BottomNav')}
          ></MaterialIcons>
        </Left>
        <Body style={{flex: 3,justifyContent: 'center'}}>
        </Body>
        </Header>
        <View style={styles.container}>
        <Content>
           <Left>
              <Body>
              <Text style={styles.logo1} > User Help </Text>
              <View>
              <Text style={styles.text}>1. To Add products click on + icon at the bottom of the screen.</Text>
              <Text style={styles.text}>2. To seacrh products as per your needs you can use dropdown menus at the top of screen or by using search bar.</Text> 
              <Text style={styles.text}>3.To reset your password click on forgot password and follow the instructions.</Text>
              </View>
              </Body>
            </Left>
           </Content>
           </View>
        </Container>
        
    )

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#112339',
  },
  logo1:{
    fontSize:35,
    color:"white",
    marginBottom:70,
    shadowColor: '#D49A9A',
  },
  text:{
    fontSize:28,
    color:"#D49A9A",
    marginBottom:50,
  },
});