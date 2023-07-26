import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../../../Background';
import Style from './Style';
import {useDispatch, useSelector} from 'react-redux';
import {Register} from '../../../Redux/Action.js/Authaction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = props => {
  const dispatch = useDispatch();
  // States Hooks

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers

  // const {user,error} = useSelector((state)=>state.auth)
  // console.log(user)

  // Register Handlers

  const handleRegister = async (name, email, password) => {
    try {
       dispatch(Register(name, email, password));
      setEmail('');
      setName('');
      setPassword('');
      props.navigation.navigate('Login')
    } catch (error) {
      console.log(error);
    }
  };

  // For Clearing AsyncStorage

  // async function clearAllData() {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared successfully.');
  //   } catch (error) {
  //     console.log('Error clearing AsyncStorage:', error);
  //   }
  // }

  // // Call the function to clear all data
  // clearAllData();

  return (
    <Background>
      <View style={Style.registerView}>
        <Text style={Style.outertext}>Register User</Text>
      </View>
      <View style={Style.container}>
        <View>
          <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
            Name
          </Text>
          <TextInput
            style={Style.inputbox}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={value => setName(value)}></TextInput>
          <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
            Email
          </Text>
          <TextInput
            style={Style.inputbox}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={value => setEmail(value)}></TextInput>
          <Text style={{color: 'black', marginLeft: 30, fontSize: 20}}>
            Password
          </Text>
          <TextInput
            style={Style.inputbox}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}></TextInput>
          <TouchableOpacity
            style={Style.buttontouchable}
            onPress={() => {
              handleRegister(name, email, password);
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              Register
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
          <Text style={{fontSize: 18}}>Alerady a User? </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={{fontSize: 18, color: 'blue'}}>
              Please Login to continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default Signup;
