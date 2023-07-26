import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { verticalScale } from '../../../assets/Dimension';

export default Style = StyleSheet.create({
  mainview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    alignItems: 'center',
    color: 'black',
  },
  startbtn: {
    backgroundColor: 'white',
    padding: 15,
    marginTop:verticalScale(50),
    width: 200,
    borderRadius:20,
    elevation:6
  },
  starttext:{
    fontSize:18,
    textAlign:"center"
  }
});
