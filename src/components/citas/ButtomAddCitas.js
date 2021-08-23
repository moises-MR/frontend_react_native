import React from 'react'
import { TouchableOpacity, StyleSheet,Alert } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"

export default function ButtomAddCitas() {

   
     const navigation = useNavigation()

    const addCita = () => {
        navigation.navigate("newAppoiment",{nuevo:true})
    }

    return (
        <TouchableOpacity 
        onPress={addCita} 
        style={styles.buttomCitas}>
            <FontAwesome
            name="plus" 
            size={16} 
            color="#FFF"
            />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
   
    buttomCitas:{
        top: 0,
        width: 40,
        height: 40,
        borderRadius:50,
        backgroundColor:"#0681be",
        marginTop:10,
        marginLeft:"auto",
        marginRight:20,
        marginBottom:10,
        justifyContent:"center",
        alignItems:"center"

    },
  
})
 
