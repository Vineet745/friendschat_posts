import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Modal
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import style from './style';

const Add = props => {
  const {user, error} = useSelector(state => state.auth);
  //  State Hoooks

  const [imagedata, setImagedata] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setloading] = useState(false)
  // Image Library



  const imagelibrary = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImagedata(result);
    console.log(result);

  };

  // Upload Image

  const uploadImage = async () => {
    try {
      setloading(true)
      // Getting Id from the AsyncStorage
      const postId = uuid.v4();
      const reference = storage().ref(imagedata.assets[0].fileName);
      const pathToFile = imagedata.assets[0].uri;
      await reference.putFile(pathToFile);

      // Url
      const url = await storage()
        .ref(imagedata.assets[0].fileName)
        .getDownloadURL();
         firestore()
        .collection('posts')
        .doc(postId)
        .set({
          image: url,
          caption: caption,
          creator: user,
          Likes: [],
          Comments: [],
          postId: postId,
        })
        .then(res => {
          console.log('Image added', res);
          props.navigation.navigate('Home');
          setImagedata(null);
          setCaption('');
          setloading(false);
        })
        .catch(err => {
          console.log('Image error', err);
          setloading(false);

        });
    } catch (error) {
      console.error('Error uploading image:', error);
      setloading(false);

    }
  };

  //  Launch Gallery

  return (
    <View style={style.mainadd}>
      <Modal visible={loading} transparent={true} animationType="none" >
        <View style={{ height:60,width:60, justifyContent: 'center',position:"absolute",top:340,left:150,alignItems: 'center', backgroundColor:"white",borderRadius:20 }}>
          <ActivityIndicator size={50} color="blue" animating={true} />
        </View>
      </Modal> 
      <View style={style.imageselector}>
        <View style={style.imagecontainer}>
          <Image
            style={style.imageview}
            source={{uri: imagedata?.assets[0]?.uri}}
          />
        </View>
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
        <TouchableOpacity onPress={() => imagelibrary()} style={style.buttons}>
          <Text style={{fontSize: 20, color: 'white'}}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => uploadImage()} style={style.buttons}>
          <Text style={{fontSize: 20, color: 'white'}}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add;
