import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screen/MainScreen/Home/Home';
import Add from '../Screen/MainScreen/Add/Add';
import Profile from '../Screen/MainScreen/Profile/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Comment from '../Screen/Comment/Comment';
import Chat from '../Screen/Chat/Chat';
import Message from '../Screen/Messages/Message';
import Deletepost from '../Screen/Deletepost/Deletepost';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => props.navigation.navigate('Chat')}>
              <Ionicons name="chatbubble" size={25} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
};


const ProfileStack = props => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Delete" component={Deletepost} />
    </Stack.Navigator>
  );
};

const Mainstack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'ProfileStack') {
            iconName = focused
              ? 'user'
              : 'user';
          } else if (route.name === 'Add') {
            iconName = focused
              ? 'pluscircleo'
              : 'pluscircleo';
          }

          return <AntDesign name={iconName} size={30} color={'black'} />;
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{headerShown:false}} />
    </Tab.Navigator>
  );
};

export default Mainstack;
