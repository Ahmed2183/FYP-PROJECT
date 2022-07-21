import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {
  Left,
  Card,
  CardItem,
  Picker,
  Header,
  Item,
  Icon,
  Input,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {addtocart, deletefromcart} from '../Redux/actions/cart';
import {RadioButton} from 'react-native-paper';

function Gaming({addTo, deleteFrom, cart}) {
  const [post, setPost] = React.useState([]);
  const [cpost, setCpost] = React.useState([]);
  const [area, setArea] = React.useState('area');
  const [value, setValue] = React.useState('');

  React.useEffect(async () => {
    await firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPost(newPost.filter(x => x.catagory === 'Gaming'));
      });
  }, []);
  const [comment, setComment] = React.useState([]);

  React.useEffect(async () => {
    await firestore()
      .collection('comment')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCpost(newPost);
      });
  }, []);
  const comdata = cpost.filter(x => x.id.id === post.id);

  function addComment(id, username) {
    //Getting Key to provide unique id to every comment
    let Keys = database().ref(`/`).push().key;
    console.log('Keys===>', Keys);

    firestore()
      .collection('comment')
      .doc(id / Keys)
      .set({
        comment: comment,
        name: username,
        date: new Date(),
        id: id,
        rating: value,
      })
      .then({
        setValue: setValue(''),
        setComment: setComment(''),
      });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Picker
              style={{width: '33%'}}
              mode="dropdown"
              selectedValue={area}
              onValueChange={value => setArea(value)}>
              <Picker.Item label="Area" value="area" color="#D49A9A" />
              <Picker.Item label="Lahore" value="Karachi" color="#D49A9A" />
              <Picker.Item label="Karachi" value="Lahore" color="#D49A9A" />
            </Picker>
          </View>
          <View>
            {area !== ''
              ? post
                  .filter(post => area !== post.area)
                  .map(post => (
                    <Card key={post.username.id}>
                      <CardItem style={styles.card}>
                        <Left>
                          <AntDesign name="user" size={30} color="#D49A9A" />
                          <Text
                            style={{
                              fontSize: 25,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            {' '}
                            {post.username}{' '}
                          </Text>
                        </Left>
                      </CardItem>
                      <CardItem style={{justifyContent: 'center'}}>
                        <Image
                          style={{height: 200, width: 150}}
                          source={{
                            uri: post.image,
                          }}
                        />
                      </CardItem>
                      <CardItem
                        cardBody
                        style={{
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            color: 'black',
                          }}>
                          {' '}
                          {post.name}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: 'black',
                            justifyContent: 'flex-end',
                          }}>
                          {'Pkr' + ' '}
                          {post.price}
                          {' ' + '/='}
                        </Text>
                      </CardItem>
                      <CardItem
                        cardBody
                        style={{
                          justifyContent: 'space-between',
                          width: '90%',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: 'black',
                          }}>
                          {' '}
                          {post.catagory}{' '}
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: 'black',
                          }}>
                          {' '}
                          {post.area}{' '}
                        </Text>
                      </CardItem>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'black',
                          marginLeft: '5%',
                        }}>
                        {' '}
                        {post.description}{' '}
                      </Text>
                      <View style={{alignItems: 'center', marginBottom: '2%'}}>
                        <TouchableOpacity
                          style={styles.loginBtn1}
                          onPress={() =>
                            !cart.includes(post)
                              ? addTo(post)
                              : deleteFrom(post.id)
                          }>
                          <Text
                            style={
                              ({fontfamily: 'poppins'},
                              {fontWeight: 'bold'},
                              {color: 'black', fontSize: 18})
                            }>
                            {cart.includes(post)
                              ? 'Remove from cart'
                              : 'Add to cart'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#f2f2f2',
                          height: 60,
                          borderRadius: 30,
                          width: '95%',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginHorizontal: '3%',
                          marginBottom: '5%',
                        }}>
                        <Input
                          placeholder="Comment Here.."
                          placeholderTextColor="#D49A9A"
                          onChangeText={text => setComment(text)}
                          labelValue={comment}
                        />
                        <TouchableOpacity
                          style={{marginRight: '2%'}}
                          onPress={() => addComment(post.id, post.username)}>
                          <Ionicons name="send" size={30} color="#D49A9A" />
                        </TouchableOpacity>
                      </View>
                      <RadioButton.Group
                        onValueChange={newValue => setValue(newValue)}
                        value={value}>
                        <Text style={styles.gen}>Rating</Text>
                        <View style={styles.radio}>
                          <RadioButton value="1" />
                          <Text style={styles.lab}>1</Text>
                          <RadioButton style={styles.sec} value="2" />
                          <Text style={styles.lab}>2</Text>
                          <RadioButton style={styles.sec} value="3" />
                          <Text style={styles.lab}>3</Text>
                          <RadioButton style={styles.sec} value="4" />
                          <Text style={styles.lab}>4</Text>
                          <RadioButton style={styles.sec} value="5" />
                          <Text style={styles.lab}>5</Text>
                        </View>
                      </RadioButton.Group>
                      <View>
                        {comdata.map(comdata =>
                          comdata.id == post.id ? (
                            <View style={styles.com}>
                              <Text>{comdata.comment}</Text>
                              <Text>Rating {comdata.rating}</Text>
                            </View>
                          ) : null,
                        )}
                      </View>
                    </Card>
                  ))
              : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lab: {
    marginTop: '2%',
  },
  sec: {
    marginHorizontal: '100%',
  },
  gen: {
    marginHorizontal: '8%',
    fontSize: 18,
  },
  radio: {
    // flex: 1,
    flexDirection: 'row',
    marginHorizontal: '10%',
  },
  picker: {
    width: 300,
    height: 45,
    borderColor: 'blue',
    borderWidth: 1,
  },
  card: {
    flex: 1,
    height: 75,
    width: 400,
  },
  button: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#87C7D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
  },
  loginBtn1: {
    width: '60%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowRadius: 10,
    backgroundColor: '#D49A9A',
    shadowColor: '#87C7D8',
    shadowOpacity: 1,
    elevation: 3,
    shadowOffset: {width: 1, height: 5},
  },
  com: {
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '3%',
    borderRadius: 10,
    backgroundColor: '#c9c4c3',
    padding: 5,
  },
});

const mapStatetoProps = state => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    addTo: product => dispatch(addtocart(product)),
    deleteFrom: id => dispatch(deletefromcart(id)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Gaming);
