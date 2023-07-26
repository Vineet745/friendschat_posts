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
  console.log(route.params.data);
  const [caption, setCaption] = useState(route.params.data.caption);
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
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Update', {data: route.params.data})
          }
          style={[style.buttons, {backgroundColor: 'green'}]}>
          <Text style={{fontSize: 20, color: 'white'}}>Update Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Deletepost;
