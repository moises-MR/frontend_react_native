import { StyleSheet } from "react-native";
import colors from "./colors";




const formStyle = StyleSheet.create({

    input:{
        marginBottom:20,
        backgroundColor:"transparent"
    },
    btnSucces:{
        padding: 5,
        backgroundColor:colors.primary,
        width: "80%",
        marginLeft:"auto",
        marginRight:"auto"
    },
    btnText:{
        marginTop:20,

    },
    btnTextLabel:{
        color: colors.dark
    }


});


export default formStyle;