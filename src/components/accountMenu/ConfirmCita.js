import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { guardaDatosCita } from "../../api/CitasApi"
import useAuth from "../../hooks/useAuth"


export default function ConfirmCita(props) {

    const { auth } = useAuth();

   

    const {route:{params}} = props;
    
    const {  horaFinal, horaInicial, services, days } = params;

        const { jueves, lunes, 
            martes, miercoles, sabado, domingo, viernes,} = days;




        const hoursComplete = () => {
            const array = []
            const arrayFinal =  []
    
            for (let index = horaInicial; index <= horaFinal; index++) {
    
                array.push(index)
              
            }

            array.forEach(hora => {
                arrayFinal.push({
                    hora:`${hora}:00 hrs`,
                    diponible:true
                })
               
            });
            
    

            return arrayFinal
        }


    


        

   

    const dias = {
        lunesDay: {
        trabaja : lunes,
        name:"lunes"  
        },
        martesDay: {
        trabaja : martes,
        name:"martes"  
        },
        miercolesDay: {
        trabaja : miercoles,
        name:"miércoles"  
        },
        juevesDay: {
        trabaja : jueves,
        name:"jueves"  
        },
        viernesDay: {
        trabaja : viernes,
        name:"viernes"  
        },
        sabadoDay: {
        trabaja : sabado,
        name:"sábado"  
        },
        domingoDay: {
        trabaja : domingo,
        name:"domingo"  
        },
        horaFinal,
        horaInicial,
        horasCompletas:hoursComplete()
    }

  
    const navigation = useNavigation();

    const calarHours = (hora) => {

        let Inicial = "";

            switch (hora) {
                case 0:
                    Inicial = "12-AM"
                    break;
                case 1:
                    Inicial = "1-AM"
                    break;
                case 2:
                    Inicial = "2-AM"
                    break;
                case 3:
                    Inicial = "3-AM"
                    break;
                case 4:
                    Inicial = "4-AM"
                    break;
                case 5:
                    Inicial = "5-AM"
                    break;
                case 6:
                    Inicial = "6-AM"
                    break;
                case 7:
                    Inicial = "7-AM"
                    break;
                case 8:
                    Inicial = "8-AM"
                    break;
                case 9:
                    Inicial = "9-AM"
                    break;
                case 10:
                    Inicial = "10-AM"
                    break;
                case 11:
                    Inicial = "11-AM"
                    break;
                case 12:
                    Inicial = "12-PM"
                    break;
                case 13:
                    Inicial = "1-PM"
                    break;
                case 14:
                    Inicial = "2-PM"
                    break;
                case 15:
                    Inicial = "3-PM"
                    break;
                case 16:
                    Inicial = "4-PM"
                    break;
                case 17:
                    Inicial = "5-PM"
                    break;
                case 16:
                    Inicial = "4-PM"
                    break;
                case 17:
                    Inicial = "5-PM"
                    break;
                case 18:
                    Inicial = "6-PM"
                    break;
                case 19:
                    Inicial = "7-PM"
                    break;
                case 20:
                    Inicial = "8-PM"
                    break;
                case 21:
                    Inicial = "9-PM"
                    break;
                case 22:
                    Inicial = "10-PM"
                    break;
                case 23:
                    Inicial = "11-PM"
                    break;
              
        
                default:
                    break;
            }

            return Inicial; 
          
    }







    const sendDatos = async () => {

        
        try {
     await guardaDatosCita(auth.id,dias,Object.values(services),auth.token); 
          navigation.navigate("menu") 
        } catch (error) {
            console.log(errro);
        }
        
    }
    
 
    return (
        <>
            <Text style={styles.title}>Servicio de citas</Text>

            <View style={styles.container}>
            <Text style={styles.textFirst}>Dias para agendar citas :</Text>
            {
            lunes && <Text style={styles.textDays}>Lunes</Text>
            }
            {
            martes && <Text style={styles.textDays}>Martes</Text>
            }
            {
            miercoles && <Text style={styles.textDays}>Miercoles</Text>
            }
            {
            jueves && <Text style={styles.textDays}>Jueves</Text>
            }
            {
            viernes && <Text style={styles.textDays}>Viernes</Text>
            }
            {
            sabado && <Text style={styles.textDays}>Sabado</Text>
            }
            {
            domingo && <Text style={styles.textDays}>Domingo</Text>
            }

            <Text style={styles.textFirst}>Hora de inicio de citas :</Text>
            <Text style={styles.textDays}>{calarHours(horaInicial)}</Text>

            <Text style={styles.textFirst}>Hora de ultima cita :</Text>
            <Text style={styles.textDays}>{calarHours(horaFinal)}</Text>

            <Text style={styles.textFirst}>Servicios :</Text>
            {Object.values(services).map((value)=>(
            <Text key={value} style={styles.textDays}>{value}</Text>

            ))}
            <Text style={styles.textFirst}>Medio de citas :</Text>
            <Text style={[styles.textDays]}>CHAT-BOT</Text>
        

        <View style={styles.viewButtom}>
 
    
          <Button
            mode="contained"
            onPress={() => navigation.navigate("menu")}
            style={styles.buttomCalcel}
          >
            cancelar
          </Button>

          <Button
            mode="contained"
            onPress={sendDatos}
            style={styles.buttomConfirm}
          >
            confirmar
          </Button>

        
        </View>








            </View>
        </>
    )
}


const styles = StyleSheet.create({
    title:{
        fontSize:18,
        margin: 20
    },
    container:{
        width: "80%",
        marginLeft:"auto",
        marginRight:"auto",
        // marginTop:"auto",
        // marginBottom:"auto",
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
    textFirst:{
    marginTop:5,
    marginLeft:5,
    fontSize:16,
    marginBottom:10
    },
    textDays:{
        marginTop:3,
        marginLeft:5,
        fontSize:14
    },
    negritas:{
        fontWeight:"bold"
    },
    buttomCalcel:{
        margin: 10,
        backgroundColor:"#c81d11",
        marginLeft:"auto"
    },
    buttomConfirm:{
        margin: 10,
        backgroundColor:"#0098d3",

    },
    viewButtom:{
        width: "100%",
        marginTop:55,
        flexDirection:"row",
    }
});