import { StyleSheet } from "react-native"
import { verticalScale,horizontalScale,moderateScale } from "../../../assets/Dimension"

export const Style = StyleSheet.create({
    maincontainer:{
        height:verticalScale(490),
        borderWidth:horizontalScale(0.5)
    },
    Imagecontainer:{
        height:verticalScale(350),
        borderWidth:horizontalScale(0.5)

    },
    sectioncontainer:{
        padding:moderateScale(10),
        flexDirection:"row"
    },
    icons:{
         marginLeft:10,
    },
    usercontainer:{
        height:verticalScale(50),
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:20
    },
    profile:{
        width:40,
        height:40,
        borderWidth:1,
        borderRadius:50,
        overflow:"hidden",
        objectFit:"cover"
    },
    showlikes:{
        padding:horizontalScale(10),
        height:verticalScale(35),
        paddingLeft:horizontalScale(20),

    }
})