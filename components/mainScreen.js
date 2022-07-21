import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import Header from '../component/Header';
import {useNavigation} from '@react-navigation/native';
import Appbar from './Appbar'

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar/>
        <View style={styles.container}>
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('electronic')}>
              <Image
                style={styles.img}
                source={{uri:'https://www.pinclipart.com/picdir/middle/391-3917890_get-business-value-from-sustainable-data-electronics-icon.png'}}
              />
              <Text style={styles.name}>Electronic</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
            onPress={() => navigation.navigate('furnicher')}>
              <Image
                style={styles.img}
                source={{uri:'https://img.icons8.com/ios/452/furniture.png'}}
              />
              <Text style={styles.name}>Furniture</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('bags')}>
              <Image
                style={styles.img}
                source={{uri:'https://cdn3.vectorstock.com/i/1000x1000/38/82/business-leather-bag-icon-outline-style-vector-31403882.jpg'}}
              />
              <Text style={styles.name}>Bags</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('accessories')}>
              <Image
                style={styles.img}
                source={{uri:'https://static.thenounproject.com/png/30762-200.png'}}
              />
              <Text style={styles.name}>Accessories</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('gaming')}>
              <Image
                style={styles.img}
                source={{uri:'https://www.kindpng.com/picc/m/19-191439_gaming-icon-png-game-icon-png-yellow-transparent.png'}}
              />
              <Text style={styles.name}>Gaming</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('household')}>
              <Image
                style={styles.img}
                source={{uri:'https://img.freepik.com/free-vector/household-cleaning-elements-set_1284-46776.jpg?size=338&ext=jpg'}}
              />
              <Text style={styles.name}>House Hold</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#112339',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    width: '96%',
    marginLeft: 8,
    height: 220,
  },
  img: {
    width: 180,
    height: 100,
    marginLeft: 5,
    marginTop: 35,
    borderRadius: 30,
    resizeMode:'center',
  },
  name: {
    fontSize: 26,
    marginTop: 10,
    textAlign:'center',
  },
  btn: {
    width: 190,
    height: 190,
    borderRadius: 30,
    backgroundColor: 'whitesmoke',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Home;