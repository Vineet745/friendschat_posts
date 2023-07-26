import { StyleSheet } from "react-native";
import { verticalScale,horizontalScale,moderateScale } from "../../assets/Dimension";

export const chatstyle = StyleSheet.create({
    chatcontainer:{
        flex:1,
        borderWidth:1,
        borderColor:"green",
    },
    listcontainer:{
       height:verticalScale(55),
       marginTop:verticalScale(1),
       flexDirection:"row",
       alignItems:"center",
       paddingLeft:moderateScale(20),
       borderBottomColor:"gray",
       borderBottomWidth:1
    },
    imageicon:{
        width:40,
        borderWidth:1,
        height:40,
        borderRadius:50,
        marginRight:horizontalScale(10),
        overflow:"hidden"
    },
    username:{
        color:"black",
        fontSize:moderateScale(16),
        fontStyle:"italic"
    }
})