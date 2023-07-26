import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Background from '../../../Background';
import Style from './Style';


const Splash = (props) => {



  return (
    <Background>
      <View style={Style.mainview}>
        <Text style={Style.text}>Friends Application</Text>
        
      </View>
    </Background>
  );
};

export default Splash;
