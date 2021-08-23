import React,{ useState} from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import NumberPlease from "react-native-number-please";
import { Button,List } from "react-native-paper";
import { formStyle } from "../../styles"
import { useNavigation } from "@react-navigation/native"



export default function horasLaborales(props) {

    const navigation = useNavigation();


    const initialValues = [{ id: "hrsInitial", value: 7 }];
    const initialValuesFin = [{ id: "hrsFinal", value: 16 }];



    const [hrsInitial, setHrsInitial] = useState(initialValues);
    const [hrsFinal, setHrsFinal] = useState(initialValuesFin);

    const hrsNumberInitial = [{ id: "hrsInitial",  min: 0, max: 23,label: " HRS"}];
    const hrsNumberFinal = [{ id: "hrsFinal",  min: 0, max: 23,label: " HRS"}];
   
    return (
      <View style={styles.container}>
<List.Subheader >Selecciona los horarios de atencion.</List.Subheader>
        
        <Text style={styles.text}>Hora de inicio de citas :</Text>

        <NumberPlease
          digits={hrsNumberInitial}
          values={hrsInitial}
          onChange={(values) => setHrsInitial(values)}
        />
          <Text style={styles.text}>Hora de fin de citas :</Text>

        <NumberPlease
          digits={hrsNumberFinal}
          values={hrsFinal}
          onChange={(values) => setHrsFinal(values)}
        />
 
        <Button
        mode="contained"
        style={[formStyle.btnSucces, styles.btnWidth]}
        onPress={()=>{
           navigation.navigate("confirm-citas",{
            horaInicial : hrsInitial[0].value,
            horaFinal  : hrsFinal[0].value,
            days:props.route.params.days,
            services:props.route.params.services
            // lunes:props.route.params.lunes,
            // martes:props.route.params.martes,
            // miercoles:props.route.params.miercoles,
            // jueves:props.route.params.jueves,
            // viernes:props.route.params.viernes,
            // sabado:props.route.params.sabado,
            // domingo:props.route.params.domingo,

        })
     
        }}
        >siguiente</Button>
        
      </View>
  
    )
}


const styles = StyleSheet.create({
    container:{
    
    },
    text:{
        textAlign:"center",
        margin: 15,
   
    },
    btnWidth:{
        width: "40%",
        marginTop:30
    }
});