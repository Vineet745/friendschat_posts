import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React,{useState,useEffect} from 'react';
import Background from '../../../Background';
import Style from './Style';
import { useDispatch,useSelector } from 'react-redux';
import { loginuser } from '../../../Redux/Action.js/Authaction';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from "@react-native-firebase/firestore"


const Login = props => {
  


  const dispatch = useDispatch();
  // Hooks
  // State Hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [UserId,setUserId] = useState('')


  // Handlers

   const handleLogin= async(email,password)=>{
    try {
      // const userdata = {
      //   email:email,
      //   password:password
      // };
      dispatch(loginuser(email,password))
    } catch (error) {
      console.log(error);
    }
    
   }



  return (
    <Background>
      <View style={Style.registerView}>
        <Text style={Style.outertext}>Login User</Text>
      </View>
      <View style={Style.container}>
        <View>
          <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
            Email
          </Text>
          <TextInput
            style={Style.inputbox}
            value={email}
            onChangeText={(value)=>setEmail(value)}
            placeholder="Enter Your Email"></TextInput>
          <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
            Password
          </Text>
          <TextInput
            style={Style.inputbox}
            value={password}
            onChangeText={(value)=>setPassword(value)}
            placeholder="Enter Your Password"></TextInput>
          <TouchableOpacity style={Style.buttontouchable} onPress={()=>handleLogin(email,password)}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text style={{fontSize: 18}}>Not a User? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={{fontSize: 18, color: 'blue'}}>
              Please Signup to continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default Login;
