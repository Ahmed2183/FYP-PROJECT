import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import { v4 as uuidv4 } from 'uuid';
import storage from "@react-native-firebase/storage";
import {useNavigation} from '@react-navigation/native';



const CheckOut = () => {
    const [productID, setproductID] = React.useState(uuidv4())
    const [Img, setImg] = React.useState("");
    const [newimage, setnewimage] = React.useState("");
    const navigation = useNavigation();



    const uploadImg = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(async (image) => {
          console.log(image);
          const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
          setImg(imageUri);
          let imgName = image.path.substring(image.path.lastIndexOf("/payment"));
          // console.log(imgName);
    
          let ext = imgName.split(".").pop();
          let name = productID;
          let newname = name + "." + ext;
          console.log(ext, name, newname);
    
          const reference = storage().ref(newname);
          setnewimage(newname);
          try {
            reference.putFile(imageUri).then(() => {
              alert("Payment Success");
              navigation.navigate('MainScreen')
            });
          } catch (error) {
            alert(error.message);
          }
        });
      };
    return(
        <SafeAreaView>
        <View style={{backgroundColor:'#112339', height:'100%',}}>
        <Text style={styles.head1}> Payment Method </Text>
        <View style={styles.btn}>
        <TouchableOpacity
          style={styles.photobtn}
          onPress={uploadImg}
          >
            <View style={{flexDirection:"row"}}>
            <Ionicons name="md-camera-outline" size={30} color= '#D49A9A' />
          <Text style={{ fontWeight: "bold", color: '#D49A9A', marginTop:6, paddingLeft:6 }}>Upload Your Receipt</Text>
          </View>
        </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    head1: {
        marginTop: '20%',
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
        padding: 5,
    },
      photobtn: {
        width: '70%',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#87C7D8',
        shadowOpacity: 3,
        elevation: 3,
        shadowOffset: {width: 1, height: 2},
      },
      btn:{
        alignItems:'center',
      },
})



export default CheckOut;