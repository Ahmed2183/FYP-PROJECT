import {
  Accordion,
  Container,
  Content,
  Header,
  Card,
  CardItem,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import { addtocart, deletefromcart} from '../Redux/actions/cart';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Agrment from './Agrment';
import { Modal, Portal, Button, Provider } from 'react-native-paper';


const mapDispatchtoProps = dispatch => {
  return {
    delete: id => dispatch(deletefromcart(id)),
    add: product => dispatch(addtocart(product))
  };
};

const mapStatetoProps = state => {
  return {
    cart: state.cartReducer.cart,
  };
};

class scrCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      visible: false,
    };
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps !== this.props) {
      this.setState({cart: this.props.cart});
    }
  }
  

  render() {
    
    function _renderHeader(item, expanded) {
      return (
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#D49A9A',
          }}>
          <Text style={{fontWeight: '600'}}> {item.name}</Text>
          {expanded ? (
            <Icon
              type="ionicon"
              style={{fontSize: 18}}
              name="add-circle-outline"
            />
          ) : (
            <Icon style={{fontSize: 18}} name="remove-circle-outline" />
          )}
        </View>
      );
    }

    const _renderContent = (product, expanded) => {
      const that = this
      return (
        <Card key={product.username.id}>
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
                {product.username}{' '}
              </Text>
            </Left>
          </CardItem>
          <CardItem style={{justifyContent: 'center'}}>
            <Image
              style={{height: 200, width: 150,}}
              source={{
                uri: product.image,
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
              {product.name}{' '}
            </Text>

            <Text
              style={{
                fontSize: 17,
                color: 'black',
                justifyContent: 'flex-end',
              }}>
              {'Pkr' + ' '}
              {product.price}
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
              {product.catagory}{' '}
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
              }}>
              {' '}
              {product.area}{' '}
            </Text>
          </CardItem>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              marginLeft: '5%',
            }}>
            {' '}
            {product.description}{' '}
          </Text>
          <View style={{alignItems: 'center', marginBottom: '1%',}}>
                  <TouchableOpacity
                    style={styles.loginBtn1}
                    onPress={() => that.props.delete(product.id)}
                    >
                    <Text
                      style={
                        ({fontfamily: 'poppins'},
                        {fontWeight: 'bold'},
                        {color: 'black', fontSize: 18})
                      }>
                    Remove from cart
                    </Text>
                  </TouchableOpacity>
                </View>
        </Card>
      );
    }

    return (
      <Container>
        {/* {console.log(this.state.cart[0].id)} */}
        <View style={styles.container}>
        <Content padder>
          {/* {console.log("cart:"+ this.props.cart)} */}
          <Accordion
            dataArray={this.state.cart}
            animation={true}
            expanded={true}
            expanded={[]}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
          />
        </Content>
        </View>
        <View>
          {

          }
        </View>
        <View>
        <View style={{alignItems: 'center', marginBottom: '0%', backgroundColor:'#112339'}}>
                  <TouchableOpacity
                    style={styles.loginBtn1}
                    onPress={()=> 
                    {
                      if (this.state.cart == '') {
                        alert('Cart is Empty')
                      } else {
                        
                        this.props.navigation.navigate('agrment')
                      }
                    }
                    }
                    >
                    <Text
                      style={
                        ({fontfamily: 'poppins'},
                        {fontWeight: 'bold'},
                        {color: 'black', fontSize: 18})
                      }>
                    Check Out
                    </Text>
                  </TouchableOpacity>
                </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
   container: {
    backgroundColor: '#112339',
    flex: 1,
  },
});

export default connect(mapStatetoProps, mapDispatchtoProps)(scrCart);
