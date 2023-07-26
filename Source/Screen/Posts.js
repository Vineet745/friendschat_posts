import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome"

const Posts = ({item}) => {

        
    
    
    
        return(
          <View style={Style.maincontainer}>
          <View style={Style.usercontainer}>
            <View style={Style.profile}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/download.jpg')}></Image>
            </View>
            {console.log(">>>>>>>>", item)}
            <Text style={{marginLeft: 10}}>{item?.userdata?.name}</Text>
          </View>
          <View style={Style.Imagecontainer}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={{uri: item.image}}
            />
          </View>
          <View style={Style.sectioncontainer}>
            {/* <TouchableOpacity
              onPress={() => {
                if (getlike(item.Likes)) {
                  unlikePost(item.Likes);
                } else {
                  likePost(item.Likes);
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
            </TouchableOpacity> */}
          </View>
          <View style={Style.showlikes}>
            <Text style={{color: 'black'}}>{item.caption}</Text>
            <Text style={{color: 'black'}}>
              Liked By <Text>{item.Likes.length} People</Text>
            </Text>
          </View>
        </View>
        )
      }
    


export default Posts