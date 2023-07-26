import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStack from './Source/Navigations/AppStack';
import {useDispatch} from 'react-redux';
import {setUser} from './Source/Redux/Action.js/Authaction';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [AuthenticatedUser, setAuthenticatedUser] = useState(null);

  const userfromasync = async () => {
    try {
      auth().onAuthStateChanged(userEx => {
        if (userEx?.uid !== AuthenticatedUser?.uid) {
          const userdets = firestore()
            .collection('users')
            .doc(userEx.uid)
            .get()
            .then(res => {
              const filterdata = res.data();
              setAuthenticatedUser(userEx);
              dispatch(setUser(filterdata));
            });
        } else {
          dispatch(setUser(null));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   UseEffect

  useEffect(() => {
    userfromasync();
  }, []);

  // if(loading){
  //   return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}></View>
  // }

  return (
    <View style={{flex: 1}}>
      <AppStack />
    </View>
  );
};

export default App;
