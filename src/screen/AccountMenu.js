import React,{ useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView, Text, View, StyleSheet, Platform } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import StatusBar from "../status_bar/StatusBar";
import colors from "../styles/colors";
import useAuth from "../hooks/useAuth";
import { getUserApi } from "../api/Auth"
import { guardaDatosCita } from "../api/CitasApi";
import { descativarChatApi } from "../api/Auth";
import UserInfo from "../components/accountMenu/UserInfo"
import ScreenLoading from "../layouts/ScreenLoading";
import axios from "axios"
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../utils/constants"









export default function Menu() {






const navigation = useNavigation();

// utilizar funcion use auth para acceder al context


const { logout, auth } = useAuth();


const [isActiveCitas, setIsActiveCitas] = useState(false);
const [isActiveChatbot, setIsActiveChatbot] = useState(false);
const [userApi, setUserApi] = useState(null);
const [ acutualizar, setActualizar] = useState(false)


useFocusEffect(
    useCallback(()=>{
        (async()=>{
            if(auth.id){
                const user = await getUserApi(auth.id,auth.token)
                setUserApi(user)
                if(user){
                    setIsActiveCitas(user?.realizaCitas)
                    setIsActiveChatbot(user?.chatbotActive)
                }else{
                    setUserApi(null)
                }
            }

        })()
    },[isActiveChatbot,acutualizar])
);

const logoutAccount = () =>{

    Alert.alert(
        "Cerrar Sesión",
        "¿Estas seguro de querer cerrar la sesión",
        [
            
            {
                text:"SI",
                onPress:()=>{logout()}
            },
            {
                text:"NO"
            }
        ],
        {cancelable:false}

        )
}

const activeTextAlert = isActiveCitas ? "Desactivar" : "Activar"

const activeCitas = () =>{

    Alert.alert(
        activeTextAlert + " servicio de citas" ,
        "¿ Quieres " + activeTextAlert + " el servicio de citas ?",
        [
            
            {
                text:"SI",
                onPress:async()=>{
                    if(isActiveCitas){
                        await guardaDatosCita(userApi?._id,{},auth.token);
                        setIsActiveCitas(false)
                        return
                    }
                    navigation.navigate("daysCitas")
                }
            },
            {
                text:"NO"
            }
        ],
        {cancelable:false}

        )
}


const activeChatbot = () =>{

    Alert.alert(
        `${isActiveChatbot ? "Descatvivar CHATBOT" : "Activar CHATBOT"}`,
        `${isActiveChatbot ? "¿ Quieres desactivar el chatbot ?" : "¿ Quieres activar el chatbot ?"}`,
        [
            
            {
                text:"SI",
                onPress:async()=>{
                    await descativarChatApi(userApi?._id,!isActiveChatbot,auth.token)
                    setIsActiveChatbot(!isActiveChatbot)
                }
            },
            {
                text:"NO"
            }
        ],
        {cancelable:false}

        )
}



// para las imagenes

const formData = new FormData()
       

    const updateImage =async (info) => {
            
     const response =       await axios.post(`${API_URL}/image-profile`,formData,{
                headers:{
                    "Content-type" : "multipart/form-data",
                    Authorization : `Bearer ${auth.token}`,
                    userId: userApi._id,
                    for:info
                }
            
            });

        return response
    }

useEffect(()=>{


(async()=>{
    if(Platform.OS != "web"){
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status != "granted"){
            alert("Sin permisos")
        }
    }

  
})()

},[])


const PickImage = async (info) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        quality:1
    });

 

    if(!result.cancelled){
        
        await formData.append("imgProfile",{
            uri:result.uri,
            type:"image/jpg",
            name: new Date() + "image",



        });
 
        const response = await updateImage(info)
        if(response.status == 200){
            setActualizar(!acutualizar)
        }
        
    }
}










    return (
        <>
        <StatusBar
            backgroundColor={colors.bgDark}s
            barStyle="light-content"
            />
      {
           userApi
           
           ?

           <ScrollView>

            <UserInfo
            userInfo={userApi}
            PickImage={PickImage}
      
            />
            <List.Section>
          <List.Subheader>Mi cuenta</List.Subheader>
 
          <List.Item
          title="Cambiar nombre"
          description="Cambiar el nombre de mi cuenta"
          left={(props)=> <List.Icon {...props} color="#52489C" icon="face"/>}
          onPress={()=>{
            navigation.navigate("changeName",{_id:userApi?._id})
        
          }}
          />

          <List.Item
          title="Cambiar email"
          description="Cambiar el email de mi cuenta"
          left={(props)=> <List.Icon {...props} color="#20A4F3" icon="at"/>}
          onPress={()=>{ navigation.navigate("changeEmail",{_id:userApi?._id}) }}
          />

        

          <List.Item
          title="Cambia contraseña"
          description="Cambiar la contraseña de mi cuenta"
          left={(props)=> <List.Icon   {...props} color="#E63946" icon="key"/>}
          onPress={()=>{ navigation.navigate("changePassword",{_id:userApi?._id}) }}
          />

    
      </List.Section>


      <List.Section>

          <List.Subheader>Servicios</List.Subheader>
     
          <List.Item
          title="Servicio de citas"
          description={isActiveCitas ? "Desactivar servicio de citas" : "Activar servicio de citas"}
          left={(props)=> <List.Icon {...props} color="#4392F1" icon={isActiveCitas ? "power-off"  : "power" }/>}
          onPress={()=>{
            activeCitas()
            
          }}
          style={isActiveCitas && styles.active}
          />

        <List.Item
          title="Servicio de chatbot"
          description={isActiveChatbot ? "Desactivar servicio de chatbot" : "Activar servicio de chatbot"}
          left={(props)=> <List.Icon {...props} color="#4392F1" icon={isActiveChatbot ? "power-off"  : "power" }/>}
          onPress={()=>{
            activeChatbot()
            
          }}
          style={isActiveChatbot && styles.active}
          />
          
        </List.Section>


          <List.Section>
              <List.Subheader>App</List.Subheader>

    

          <List.Item
          title="Mis citas"
          description="Listado de mis citas"
          left={(props)=> <List.Icon {...props} color="#2EC4B6" icon="calendar"/>}
          onPress={()=>{ navigation.navigate("citas")}}
          />  

        <List.Item
          title="Fondo del chat"
          description="Cambiar el fondo del chat"
          left={(props)=> <List.Icon  {...props} color="#E4C1F9" icon="palette"/>}
          onPress={()=>{ PickImage("WhatsApp")}}
          /> 

        <List.Item
          title="Cerrar sesión"
          description="Cerrar mi sesión"
          left={(props)=> <List.Icon {...props} color="#35CE8D" icon="logout"/>}
          onPress={logoutAccount}
          />
          </List.Section>

          </ScrollView>
            :
            
            <ScreenLoading
            text="Cargando..."
            />
      }
         
             
      </>
    )
}





const styles = StyleSheet.create({
    containerSwitchCitas:{
        flexDirection:"row"
    },
    containerSwitchChat:{
        
    },
    active:{
        backgroundColor: '#0095ff38',
        marginBottom:5
    },
    iconColors:{
        backgroundColor:"#5E4C78",
        color:"#5E4C78"
    }
})