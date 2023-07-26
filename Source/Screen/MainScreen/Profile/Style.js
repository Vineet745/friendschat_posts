import { StyleSheet } from "react-native"
import { verticalScale,horizontalScale,moderateScale } from "../../../assets/Dimension"

export const Style = StyleSheet.create({
    main:{
        flex:1,
        borderWidth:1
    },

    profiledetail:{
        height:verticalScale(300),
        borderWidth:1,
        padding:verticalScale(10),
        justifyContent:"space-between",
        alignItems:"center"

    },
    imageparent:{
     flex:1,
     flexDirection:"row",
     width:"100%",
     height:"100%",
     justifyContent:"center"

    },
    imagefolder:{
       width:120,
       height:120,
       borderRadius:60,
       marginTop:10,
       overflow:"hidden",
       borderWidth:1,
    },
    Imageicon:{
        width:horizontalScale(100),
        borderWidth:moderateScale(1),
        height:verticalScale(100),
        borderRadius:moderateScale(100),        
    },
    iconPicker:{
     position:"absolute",
     bottom:5,
     right:5,
     backgroundColor:"lightblue",
     borderRadius:10

    },
    userText:{
     padding:moderateScale(20),
    },
    text:{
        fontSize:20,
        color:"black",
     marginBottom:verticalScale(10)
    },
    posts:{
        borderColor:"green",
        flex:1,
        flexDirection:"row",
        flexWrap:"wrap"
        
    },
    imagebox:{
        width:130,
        borderWidth:1,
        height:150,

    },
    postimages:{
        flexDirection:"row",
    }
})