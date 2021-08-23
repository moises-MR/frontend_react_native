import React from 'react'
import { 
View, 
Text, 
StyleSheet, 
Linking,
Platform 
} from 'react-native'
import image from "../../img/PAQUETE_BASICO(1).png"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { API_URL } from "../../utils/constants"

export default function ServicesAdicionales({url,message}) {


    const platform =  Platform.OS === 'ios' ? "&" : "?";

    const handleWhatssPress = async ( text ) => {

       await Linking.openURL(`http://wa.me/+523330142717${platform}send?text=Me intersa ${text}`)

    }


    return (
        <>
    <Card>
    <Card.Cover style={styles.container} source={{uri:`${API_URL}/${url}`}} />
    <Card.Actions>
    <Button 
    onPress={()=> handleWhatssPress(message)}
    >ME INTERESA</Button>
    </Card.Actions>
    </Card>


      
      </>
    )
}


const styles = StyleSheet.create({
    container:{

        marginTop:35,
        height:210,
        width: "95%",
        marginLeft:"auto",
        marginRight:"auto"
    
    },
    title:{
        textAlign:"center",
        marginTop:25,
        fontSize:20,
        marginBottom:20
    },

    promotion:{
        width:"80%",
        height: 250,
        backgroundColor:"#ecf8f8",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:15,
        borderRadius:10
    },
    titlePromotion:{
        fontSize:18,
        textAlign:"center",
        margin: 10
    }
})