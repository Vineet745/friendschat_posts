import {View, Text, Image, TextInput, TouchableOpacity,ActivityIndicator,Modal } from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import style from './MainScreen/Add/style';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Update = ({navigation}) => {
  const route = useRoute();
  const [caption, setCaption] = useState(route.params.data.caption);
  const [imagedata, setImagedata] = useState(null);
  const [loading, setloading] = useState(false)

  const Imagepicker = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result !== null) {
      setImagedata(result);
      console.log(result);
    } else {
      Alert.alert('Please add Image');
    }
  };

  const Updatepost = async () => {
    setloading(true)
    const reference = storage().ref(imagedata.assets[0].fileName);
    const pathToFile = imagedata.assets[0].uri;
    await reference.putFile(pathToFile);

    // Url
    const url = await reference.getDownloadURL()
         await firestore()
            .collection('posts')
            .doc(route.params.data.postId)
            .update({
              image: url,
              caption:caption
            })
            .then(() => {
              navigation.navigate('Profile');
              setloading(false)
            });
        
  };

  return (
    <View>
        <Modal visible={loading} transparent={true} animationType="none" >
        <View style={{ height:60,width:60, justifyContent: 'center',position:"absolute",top:340,left:150,alignItems: 'center', backgroundColor:"white",borderRadius:20 }}>
          <ActivityIndicator size={50} color="blue" animating={true} />
        </View>
      </Modal>

      <View style={{borderWidth: 1}}>
        <Image
          style={{
            width: 390,
            height: 400,
          }}
          source={
            !imagedata
              ? {uri: route.params.data.image}
              : {uri: imagedata?.assets[0]?.uri}
          }
        />
        <View style={style.caption}>
          <TextInput
            value={caption}
            onChangeText={value => setCaption(value)}
            style={style.captiontext}
            multiline={true}
            numberOfLines={3}
            placeholder="Add Your Caption"></TextInput>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => Imagepicker()}
          style={[style.buttons, {backgroundColor: '#ff6666'}]}>
          <Text style={{fontSize: 20, color: 'white'}}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Updatepost()}
          style={[style.buttons, {backgroundColor: 'green'}]}>
          <Text style={{fontSize: 20, color: 'white'}}>Update Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Update;
