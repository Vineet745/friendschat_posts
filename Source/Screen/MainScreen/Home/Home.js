import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Style} from './Style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Posts from '../../Posts';

const Home = props => {
  const [posts, setPosts] = useState([]);
  const [likehai, setlikehai] = useState(false);
  const [multiple,setmultiple] = useState(false);
  const [singleuser,setsingleuser] = useState(false)
  const [uid, setuid] = useState([])
  const {user, error} = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  
  
  
  
//   

   

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    try {
      firestore()
        .collection('posts')
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({...doc.data()}));
              setPosts(data)
            });
            
      // return unsubscribe; // Return the unsubscribe function for cleanup
    } catch (error) {
      console.log('Error while fetching posts', error);
    }
  };

  //  Likes Function

  const getlike = Likes => {
    return Likes.includes(user.uid);
  };

  // Like Post

  const likePost = async item => {
    try {
      if (!getlike(item.Likes)) {
        await firestore()
          .collection('posts')
          .doc(item.postId)
          .update({
            Likes: [...item.Likes, user.uid],
          });
        setlikehai(!likehai);
      }
    } catch (error) {
      console.log('Error while liking', error);
    }
  };

  // Dislike Post

  const unlikePost = async item => {
    try {
      if (getlike(item.Likes)) {
        const updateLikes = item.Likes.filter(id => id !== user.uid);
        await firestore().collection('posts').doc(item.postId).update({
          Likes: updateLikes,
        });
        setlikehai(!likehai);
      }
    } catch (error) {
      console.log('Error while Login', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={posts}
        renderItem={({item, index}) => {
          return (
            <View style={Style.maincontainer}>
              <View style={Style.usercontainer}>
                <View style={Style.profile}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri:item.creator.profileimage}}
                    />
                </View>
                <Text style={{marginLeft: 10,color:"black",fontWeight:200}}>{item.creator.name}</Text>
              </View>
              <View style={Style.Imagecontainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={{uri: item.image}}
                />
              </View>
              <View style={Style.sectioncontainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (getlike(item.Likes)) {
                      unlikePost(item);
                    } else {
                      likePost(item);
                    }
                  }}>
                  {!getlike(item.Likes) ? (
                    <FontAwesome
                      style={Style.icons}
                      color="black"
                      name="heart-o"
                      size={30}
                    />
                  ) : (
                    <FontAwesome
                      style={Style.icons}
                      name="heart"
                      color="red"
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={Style.showlikes}>
                <Text style={{color: 'black'}}>{item.caption}</Text>
                <Text style={{color: 'black'}}>
                  Liked By <Text>{item.Likes.length} People</Text>
                </Text>
              </View>
            </View>
          );
        }}></FlatList>
    </View>
  );
};

export default Home;
