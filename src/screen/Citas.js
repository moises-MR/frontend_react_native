import React,{ useState, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/native"
import { View, Text, StyleSheet, ScrollView  } from 'react-native'
import ScreenLoading from "../layouts/ScreenLoading";
import StatusBarCustom from '../status_bar/StatusBar';
import colors from "../styles/colors";
import Cita from '../components/citas/Cita';
import ButtomAddCitas from '../components/citas/ButtomAddCitas';
import { getCitasApi } from "../api/CitasApi";
import { getUserApi } from "../api/Auth";
import useAuth from "../hooks/useAuth";





export default function Citas() {

    const { auth } = useAuth()
    const [citas, setCitas] = useState(null);
    const [actualizar, setActualizar] = useState(false);
    const [loading, setLoading] = useState(false)
    const arrayVacio = {}
  

    useFocusEffect(
        useCallback(()=>{
            setCitas(null);
            (async()=>{
          

                const user = await getUserApi(auth.id,auth.token)
               if(user){
                const response = await getCitasApi(user?.idFacebook,auth.token);
                if(Object.keys(response).length > 0){
                    setCitas(response);
    
                   }else{
              
                    setCitas("");
                   }
               }
               
               
          
               
            })()
        },[actualizar])
    )
      
   
    




    return (
        <>
        <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
        />

        
        

        {
        citas
         ?
         <>
         <View style={styles.listCitasView}>
         <Text style={styles.title}>Mis citas</Text>
         <ButtomAddCitas/> 
         </View>
         <ScrollView>
         {
        citas.map((cita)=>(
        <Cita
        key={cita._id}
        cita={cita}
        setActualizar={setActualizar}
        actualizar={actualizar}
        />
            )) 
         }
            
        
       
        </ScrollView>
        </>
         :
         <>
        {
            citas === ""
                ?
                <>
            <View style={styles.sinCitas}>
            <Text style={styles.sinCitasText}>No tienes niguna cita</Text>
            </View>
            
         <ButtomAddCitas
         /> 
         </>
                :
            <ScreenLoading
            text="Cargando citas..."
            />
        }
         
         

            
         
        
        </>
        }


        


        </>
    )
}


const styles = StyleSheet.create({
    title:{
       
        padding: 20,
        fontSize:18,
       
    },
    sinCitas:{
        width: "100%",
        height: "100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    sinCitasText:{
    
        fontSize:20
    },
    listCitasView:{
        flexDirection:"row",
        
    },
    listCitas:{
        flexDirection:"row"
    },
    container:{
        // backgroundColor:"#000"
    }
  
})
 