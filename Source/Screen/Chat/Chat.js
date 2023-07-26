import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {chatstyle} from './chatstyle';
import firestore from '@react-native-firebase/firestore'

const Chat = (props) => {
  // Hook call
  const {user, error} = useSelector(state => state.auth);

  //   States
  const [allusers, setallusers] = useState();

  // Getting Users

  const getUsers = async () => {
    let array = [];
    await firestore()
      .collection('users')
      .where('email', '!=', user.email)
      .get()
      .then(res => {
        res.docs.map(item => {
          array.push(item.data());
        });
      });
    setallusers(array);
  };

  useEffect(() => {
    getUsers()
  }, [])
  

  return (
    <View style={chatstyle.chatcontainer}>
        <FlatList
        data={allusers}
        renderItem={({item,index})=>{
           return<TouchableOpacity onPress={()=>(props.navigation.navigate('Message',{data:item}))}>
        <View style={chatstyle.listcontainer}>
          <View style={chatstyle.imageicon}>
            <Image style={{height:"100%",width:"100%"}} source={{uri:item.profileimage}}/>
          </View>
          <Text style={chatstyle.username}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      }} >
      </FlatList>
    </View>
  );
};

export default Chat;
