
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Dimension'

export default Style = StyleSheet.create({
    mainadd:{
        flex:1

    },
    imageselector:{
        height:verticalScale(350),
        marginBottom:30
    },
    imagecontainer:{
        height:"100%",
        width:"100%",
        height:verticalScale(280),
        width:horizontalScale(372),

    },
    imageview:{
        height:"100%",
        width:"100%",
        resizeMode:"cover"
        
    },
    caption:{
        borderWidth:0.5,
    },
    captiontext:{
        fontStyle:"italic",
        fontSize:moderateScale(16)
        
    },
    buttons:{
            margin: 10,
            backgroundColor: 'blue',
            width: horizontalScale(250),
            alignItems: 'center',
            padding:verticalScale(10),
            borderRadius:30
    }
    
})
  

