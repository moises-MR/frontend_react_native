import React, { useState, useCallback } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import { getChatUserApi, upDateMessagesApi } from "../api/Chats";
import ScreenLoading from '../layouts/ScreenLoading';
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from '../status_bar/StatusBar';
import colors from "../styles/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { API_URL } from "../utils/constants"
import { getUserApi } from "../api/Auth.js"
import useAuth from "../hooks/useAuth"


export default function Example(props) {


  const {route:{ params }} = props;

  const { auth } = useAuth();


  const [messages, setMessages] = useState([]);
  const [userForImage, setUserForImage] = useState(null)

  const renderIconSend = (props)=>{

    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons 
          name="send-circle" 
          size={32} 
          color="#6fd5d5" 
          style={{marginBottom:5,marginRight:5}}
          />
        </View>
      </Send>
    );
  }


  const scrollToBottomComponent = () => {
    return(
      <FontAwesome  name="angle-double-down" size={22} color="#333"/>
    )
  }


  const renderBubbleColor = (props) => {
    return(
      <Bubble
      {...props}
      wrapperStyle={{
        right:{
          backgroundColor:"#0681be"
        }
      }}
      textStyle={{
        right: {
          color: "#FFF"
        }
      }}
      />
    )
  }

  
  
  useFocusEffect(
    useCallback(  ()  => {
    (async()=>{

      const chats = await getChatUserApi(params._id,auth.token);
      if(chats){
        setMessages(chats[0]?.chatComplete.reverse());
      }
      const user = await getUserApi(auth.id,auth.token);
      if(user){
        setUserForImage(user);
      }
    })()
    
  }, []));


  // const image = { uri: userForImage.imageBackgroundWhats };





  const onSend = async(message) => {
    // Tuve que scaar todos los chats y meterlos a un nuevo array y deues hacer un push de el mensaje 
     setMessages(previousMessages => GiftedChat.append(previousMessages, message))
     const chatsApi = await getChatUserApi(params._id,auth.token);
     let chatsUpdate = []; 
     chatsApi[0].chatComplete.map((chat)=>{
      chatsUpdate.push(chat)
     });
     chatsUpdate.push(message[0]);
     await upDateMessagesApi(params._id,chatsUpdate,message[0]?.text,auth.token);
  


  }
if(userForImage === null) return null

  return (
    <ImageBackground
     source={{uri:`${API_URL}/${userForImage.imageBackgroundWhats}`}} resizeMode="cover" style={styles.image}
    >
    <StatusBarCustom
    backgroundColor={colors.bgDark}
    barStyle="light-content"

    />
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend
      renderBubble={renderBubbleColor}
      renderSend={renderIconSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      user={{
        _id: 2,
      }}
    />
    </ImageBackground>
  )
}


const styles = StyleSheet.create({

  image: {
    flex: 1,
    justifyContent: "center"
  },

});
