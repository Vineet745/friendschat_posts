import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Style} from './Style';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {auth} from '@react-native-firebase/auth'
import { logoutuser } from '../../../Redux/Action.js/Authaction';
import { horizontalScale } from '../../../assets/Dimension';

const Profile = props => {
  // Call From Redux

  const {user, error} = useSelector(state => state.auth);

  const isfocused = useIsFocused();
const dispatch = useDispatch()
  const [data, setData] = useState('');
  const [profileimage, setProfileimage] = useState(null);
  const [catchprofile, setcatchprofile] = useState();
  const [name, setname] = useState();

  //Profile  Image Picker

  const Imagepicker = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result !== null) {
      setProfileimage(result);
      console.log(result);
    } else {
      Alert.alert('Please add Image');
    }
  };

  const UploadProfileImage = async () => {
    // Getting UserId from the AsyncStorage
    if (profileimage !== null) {
      const reference = storage().ref(profileimage.assets[0].fileName);
      const PathToFile = profileimage.assets[0].uri;
      await reference.putFile(PathToFile);

      // Getting data from Storage
      const url = await storage()
        .ref(profileimage.assets[0].fileName)
        .getDownloadURL();

      // Upload Data in the Firestore

      firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          profileimage: url,
        })
        .then(res => {
          console.log('Profile Added', res);
          props.navigation.navigate('Home');
        });
    }
  };

  // Getting User Data

  const getuser = async () => {
    try {
      const userdets = await firestore().collection('users');
      const doc = await userdets.doc(user.uid).get();
      const userdata = doc.data();
      setname(userdata.name);
      setcatchprofile(userdata.profileimage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, [isfocused]);

  // Userdata Posts////////////////////////////////////////////

  const gettingpostdata = async () => {
    let allimage = [];
    firestore()
      .collection('posts')
      .where('creator.uid', '==',user.uid)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(items => allimage.push(items.data()));
          setData(allimage);
        }
      });
  };

  useEffect(() => {
    gettingpostdata();
  }, [isfocused]);



  // Logout User
    
  const logout = ()=>{
    const user =  firebase.auth().signOut().then(res=>{
        console.log('Signed Out Successfully',res)
        dispatch(logoutuser(user))
       })
  }


  return (
    <View style={Style.main}>
      <View style={Style.profiledetail}>
        <View style={Style.imageparent}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => Imagepicker()}>
            <View style={Style.imagefolder}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{uri: catchprofile}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => UploadProfileImage()}
          style={{backgroundColor: 'blue'}}>
          <Text style={{color: 'white', padding: 10}}>Add Photo</Text>
        </TouchableOpacity>
    
        <View style={Style.userText}>
          <Text style={Style.text}>Name : {name}</Text>
          <Text style={Style.text}>Email : {user.email}</Text>
        </View>
        <TouchableOpacity onPress={()=> logout()}
          style={{backgroundColor: '#ff6666', width: 200, borderRadius: 10}}>
          <Text style={{color: 'white', padding: 10, textAlign: 'center'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={Style.posts}>
          <FlatList
            style={{flex: 1}}
            data={data}
            horizontal={true}
            renderItem={({item, index}) => {
              return (
                <View style={Style.postimages}>
                  <TouchableOpacity style={{flex: 1}} onPress={()=>props.navigation.navigate('Delete',{data:item})}>
                    <View style={Style.imagebox}>
                      <Image
                        style={{height: '100%', width: '100%'}}
                        source={{uri: item?.image}}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}></FlatList>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
