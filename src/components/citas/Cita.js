import React,{ useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native"
import { postAppoimentCompleteApi, deleteAppoimentApi } from "../../api/CitasApi"
import useAuth from '../../hooks/useAuth';

export default function Cita({cita,setActualizar,actualizar}) {


  const { auth } = useAuth();

  const iconsSelected = () => {
    let icon = ""
    if(cita.complete === "Pendiente"){
      icon = "minus-circle"
    }
    if(cita.complete === "Cancelada"){
      icon = "window-close"
    }
    if(cita.complete === "Completada"){
      icon = "check-circle"
    }
    return icon
  }
  const colorIcon = () => {
    let icon = ""
    if(cita.complete === "Pendiente"){
      icon = "#FFD23F"
    }
    if(cita.complete === "Cancelada"){
      icon = "#c81d11"
    }
    if(cita.complete === "Completada"){
      icon = "#008f39"
    }
  

    return icon
  }
  const icons = iconsSelected();
  const colors = colorIcon();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false)


  const deleteAppoiment = (id) =>{

    Alert.alert(
        "Eliminar cita" ,
        "¿ Estas seguro de elimar la cita ?",
        [
            
            {
                text:"SI",
                onPress:async()=>{
                  await deleteAppoimentApi(id,auth.token)
                  setActualizar(!actualizar)

                        return
                    
               
                }
            },
            {
                text:"NO"
            }
        ],
        {cancelable:false}

        )
}












    return (
      <View style={styles.citasContainer}>
        <Text style={styles.textBold}>ID cita : </Text>
        <Text style={styles.citasContainerText}>{`${cita._id}`}</Text>
        <Text style={styles.textBold}>Nombre : </Text>
        <Text style={styles.citasContainerText}>{`${cita.name}`}</Text>
        <Text style={styles.textBold}>Telefono : </Text>
        <Text style={styles.citasContainerText}>{`${cita.phone}`}</Text>
        <Text style={styles.textBold}>Cita creada : </Text>
        <Text style={styles.citasContainerText}>{`${cita.fechaCreacion}`}</Text>
        <Text style={styles.textBold}>Fecha cita : </Text>
        <Text style={styles.citasContainerText}>{`${cita.fechaCita}`}</Text>
        <Text style={styles.textBold}>Hora cita : </Text>
        <Text style={styles.citasContainerText}>{`${cita.horaCita}`}</Text>
        <Text style={styles.textBold}>ID Facebook : </Text>
        <Text style={styles.citasContainerText}>{`${cita.idCreadorCita}`}</Text>
        <Text style={styles.textBold}>Status cita : </Text>
        <Text style={styles.citasContainerText}>
          {`${cita.complete} `} 
          <Icon name={icons} size={15} color={colors} />
        </Text>
        <Text style={styles.textBold}>Servicio : </Text>
        <Text style={styles.citasContainerText}>{`${cita.service}`}</Text>

        <View style={styles.viewButtom}>
 
          

        
          <Button
            mode="contained"
            onPress={() => navigation.navigate("edit",{id:cita._id}) }
            style={styles.buttomEdit}
          >
            Editar
          </Button>


          <Button

            mode="contained"
            onPress={() => deleteAppoiment(cita._id)}
            style={styles.buttomDelete}
          >
            Eliminar
          </Button>

        
        </View>
        {
          cita.complete === "Pendiente" 
              &&
            <Button

            mode="contained"
            onPress={async () => {
              setLoading(true)
              await postAppoimentCompleteApi(cita._id,"Completada",auth.token)
              setLoading(false)
              setActualizar(!actualizar)
            }
            }
            style={styles.buttomSuccess}
            loading={loading}
          >
            completar
          </Button> 
          
           

        }
       
      </View>
    );
}


const styles = StyleSheet.create({
   
    citasContainer:{
        width: "80%",
        // backgroundColor:"#3C7F96",
        // borderWidth: 1,
        marginTop:50,
        marginBottom:50,

        marginLeft:"auto",
        marginRight: "auto",
        borderRadius:20,
        padding: 15,
        marginTop:20,
        backgroundColor:"#2ebff917",
        
    },
    citasContainerText:{
        margin: 3,
        color: "#000",
       

    },
    textBold:{
        fontWeight:"bold",
        color: "#000",
        fontSize:14,
        margin: 3

    },
    buttomSuccess:{
        margin: 10,
        backgroundColor:"#0099e6"    
    },
    buttomDelete:{
        margin: 10,
        backgroundColor:"#ed1405"    
    },
    buttomEdit:{
        margin: 10,
        backgroundColor:"#ffe600"    
    },
    icon:{
   marginLeft:"auto",
   marginRight:"auto"
    },
    viewButtom:{
        width: "100%",
        marginTop:25,
        flexDirection:"row"

        
    }
})
 
