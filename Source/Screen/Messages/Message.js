import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
const Message = () => {
  const {user} = useSelector(state => state.auth);

  const [MessagesList, setMessagesList] = useState([]);
  const route = useRoute();

  //    Call function

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(user.uid + route.params.data.uid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: Date.parse(new Date())};
      });
      setMessagesList(allmessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    // Code for Uploading at Server
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sendBy: user.uid,
      sendTo: route.params.data.uid,
      createdAt: Date.parse(msg.createdAt),
    };

    setMessagesList(previousMessages =>
      GiftedChat.append(previousMessages, mymsg),
    );

    // Firesbase Code
    // From My Side
    firestore()
      .collection('chats')
      .doc('' + user.uid + route.params.data.uid)
      .collection('messages')
      .add(mymsg);

    // From Other Side

    firestore()
      .collection('chats')
      .doc('' + route.params.data.uid + user.uid)
      .collection('messages')
      .add(mymsg);
  }, []);



  // Likes functionality



  return (
    <GiftedChat
      messages={MessagesList}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default Message;
