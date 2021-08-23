import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native"


export default function ChatComponent({chat}) {

    const { userFacebook, chatComplete, _id } = chat;


    const navigation = useNavigation();

    const goToChat = (idUser) => {
        navigation.push("chat",{_id})
    }
    
    return (
     
        
        <List.Item
        style={styles.list}
        title={userFacebook}
        // description={chatComplete[chatComplete.length -1].chat.user}
        left={(props)=> <List.Icon  {...props} color="#20A4F3"  icon="facebook-messenger"/>}
        onPress={ ()=>{ goToChat(_id) } }
        />
      
    )
};


const styles = StyleSheet.create({

    list:{
        marginTop:10,
        padding: 10,
  
    },
    
   

})
