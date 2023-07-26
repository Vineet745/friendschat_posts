import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import style from '../MainScreen/Add/style';
import {useRoute} from '@react-navigation/native';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Deletepost = props => {
  const route = useRoute();
  const [caption, setCaption] = useState();
  const [profileimage, setprofileimage] = useState(null);

  const Delete = async () => {
    try {
      await firestore()
        .collection('posts')
        .doc(route.params.data.postId)
        .delete();
      props.navigation.navigate('Profile');
    } catch (error) {
      console.log('Error while deleting', error);
    }
  };

  const Imagepicker = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result !== null) {
      setprofileimage(result);
      console.log(result);
    } else {
      Alert.alert('Please add Image');
    }
  };

  // const  Update = async ()=>{
  //      Imagepicker()
  //      const reference = storage().ref(imagedata.assets[0].fileName);
  //      const pathToFile = imagedata.assets[0].uri;
  //      await reference.putFile(pathToFile);

  //      // Url
  //      const url = await storage()
  //        .ref(imagedata.assets[0].fileName)
  //        .getDownloadURL()
  //      .then(res=>{
  //        try {
  //         console.log(route.params.data.postId)
  //         console.log(profileimage.image)
  //          firestore().collection('posts').doc(route.params.data.postId).update({
  //           image:url
  //          }).then(()=>{
  //            props.navigation.navigate('Profile')
  //          })

  //       } catch (error) {
  //         console.log('Error while Updating',error)
  //       }

  //      })
  // }

  return (
    <View>
      <View style={{borderWidth: 1}}>
        <Image
          style={{
            width: 390,
            height: 400,
          }}
          source={{uri: route.params.data.image}}
        />
        <View style={style.caption}>
          <TextInput
            value={caption}
            keyboardAppearance="false"
            onChangeText={value => setCaption(value)}
            style={style.captiontext}
            multiline={true}
            numberOfLines={3}
            placeholder="Add Your Caption"></TextInput>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => Delete()}
          style={[style.buttons, {backgroundColor: '#ff6666'}]}>
          <Text style={{fontSize: 20, color: 'white'}}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Deletepost;
