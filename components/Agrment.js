import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
const Agrment = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <Provider>
    <SafeAreaView>
      <View>
        <View>
          <Text style={styles.head}>License agreement</Text>
        </View>
        <View>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
          <View style={{alignItems: 'center', marginBottom: '2%'}}>
          <Button
            mode="contained"
            style={styles.loginBtn1}
            // onPress={() => navigation.navigate('checkout') }
            onPress={showModal}
            >
            Accept & continue
          </Button>
          </View>
          
        </View>
        
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View>
            <Text style={styles.head1}> Payment Method </Text>
          <View style={{alignItems: 'center', marginBottom: '2%'}}>
          <Button
            mode="contained"
            style={styles.loginBtn1}
            onPress={() => navigation.navigate('checkout') }
            >
            Online Payment
          </Button>
          <Button
            mode="contained"
            style={styles.loginBtn1}
            onPress={() => {
              alert('Order Is conform')
              navigation.navigate('MainScreen')} }
            >
            Cash On Delivery
          </Button>
          </View>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
    </Provider>
    
  );
};

const styles = StyleSheet.create({
    
head: {
    marginTop: '20%',
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    padding: 5,
  },
  head1: {
    // marginTop: '20%',
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
    padding: 5,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 20,
    padding: 25,
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
  modal:{
    height:'30%',
    backgroundColor:"#ffffff",
  },
})

export default Agrment;

