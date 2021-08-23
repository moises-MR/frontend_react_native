import React,{ useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { List,RadioButton, Button  } from 'react-native-paper';
import { formStyle } from "../../styles";
import { useNavigation } from "@react-navigation/native"


export default function dayCitas(props) {


    const navigation = useNavigation();

 
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [domingo, setDomingo] = useState(false);

  
    
    const isDisabled = lunes||martes||miercoles||jueves||viernes||sabado||domingo;


    const diasSeleccionados = () => {


 
        navigation.navigate("services",{
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo
        })
    }


    return (



        <>
            <List.Section>
    
<List.Subheader >Selecciona los dias en lo que te pueden realizar una cita.</List.Subheader>

    <RadioButton.Group onValueChange={value => setLunes(!lunes)} value={lunes}>
      <RadioButton.Item label="Lunes" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setMartes(!martes)} value={martes}>
      <RadioButton.Item label="Martes" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setMiercoles(!miercoles)} value={miercoles}>
      <RadioButton.Item label="Miercoles" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setJueves(!jueves)} value={jueves}>
      <RadioButton.Item label="Jueves" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setViernes(!viernes)} value={viernes}>
      <RadioButton.Item label="Viernes" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setSabado(!sabado)} value={sabado}>
      <RadioButton.Item label="Sabado" value={true} />
    </RadioButton.Group>
    <RadioButton.Group onValueChange={value => setDomingo(!domingo)} value={domingo}>
      <RadioButton.Item label="Domingo" value={true} />
    </RadioButton.Group>

        <Button
        mode="contained"
        style={[formStyle.btnSucces, styles.btnWidth]}
        disabled={!isDisabled}
        onPress={diasSeleccionados}
        >siguiente</Button>

</List.Section>
        </>
    )
}


const styles = StyleSheet.create({

    active:{
        backgroundColor: '#0095ff38',
        
    },
    btnWidth:{
        width: "40%",
        marginTop:60
    }
   
})