import React,{ useState,useCallback} from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native';
import StatusBar from "../status_bar/StatusBar";
import colors from "../styles/colors";
import ScreenLoading from "../layouts/ScreenLoading";
import { useFocusEffect } from "@react-navigation/native";
import { getChatsApi } from "../api/Chats";
import { getUserApi } from "../api/Auth";
import ChatComponent from '../components/ChatComponent';
import useAuth from "../hooks/useAuth";

export default function Chats() {
    const { auth } = useAuth();

  
    const  [chats, setChats] = useState(null);

    const [idFacebook, setIdFacebook] = useState(null);

    useFocusEffect(
        useCallback(()=>{
            setChats(null);
            (async()=>{
              
                const user = await  getUserApi(auth.id,auth.token);
           

                if(user?.idFacebook === null){
                setChats([]);
                setIdFacebook(null);
        

                }else{
                    if(!user?.idFacebook){
           
                        return
                    }

                    setIdFacebook(user.idFacebook);
                    const chats = await getChatsApi(user.idFacebook,auth.token);

                if(chats.name === "CastError") return null;
                    
                setChats(chats);
                }
                
            })()
        },[])
    );


    return (
        <>
            <StatusBar
            backgroundColor={colors.bgDark}
            barStyle="light-content"
            />
            { 
            chats 
            ?
            <>

            <Text 
            style={styles.title}
            >{
            idFacebook
                ?
            "Conversaciones"
                :
            "Sin conversaciones"
            }</Text>

            <ScrollView>
            {
                idFacebook 
                    ?
                    chats.map((chat)=>(

                    <ChatComponent
                    key={chat._id}
                    chat={chat}
                    />
                 ))
                    :
                    <Text
                    style={styles.sinConversaciones}
                    >Upss... tu chat aun no esta disponible, te avisaremos cuando todo este listo 😄
                    </Text>

            }
            </ScrollView>
            </>
            :
        <ScreenLoading
        text="Cargando chats..."
        />
            }

        
         
  
        </>
    )
}

const styles = StyleSheet.create({
    container:{
   
    },
    title:{
        textAlign: "center",
        fontSize:22,
        marginTop:20,
        marginBottom:20
    },
    sinConversaciones:{
        textAlign:"center",
        marginTop:100,
        fontSize:16
    }


   

})
