import React,{ useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import StatusBarCustom from '../../status_bar/StatusBar';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from '../../styles/colors';
import { Button, List,RadioButton } from 'react-native-paper';
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import * as Yup from "yup";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { getUserApi } from "../../api/Auth"
import useAuth from "../../hooks/useAuth"
import axios from "axios"
import { API_URL } from "../../utils/constants"
const moment = require("moment")
moment.locale("es");

export default function NewAppoiment() {

    const { auth } = useAuth();
    const hoy = moment()
    const navigation = useNavigation();
   

    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [appiomenit, setAppiomenit] = useState(null);

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
              
                const user = await getUserApi(auth.id,auth.token)
                if(user){
                    setAppiomenit(user) 
               
                }
            })()
        },[])
    )
    

        

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async (formData) =>{
            setLoading(true)
       
                formData.complete = value;
                formData.userId = appiomenit?.idFacebook
                formData.fechaCreacion = hoy.format("DD-MM-YYYY")
                formData.idCreadorCita = "Creada en la aplicación"
             const response =   await axios.post(`${API_URL}/create-appoiment`,formData,{
                headers:{
                    Authorization : `Bearer ${auth.token}` 
                }
                  
             })
             if(response?.status === 200){
                Toast.show("cita creada",{
                    position: Toast.positions.CENTER,
                });
                navigation.goBack();
               }else{
                Toast.show("Error al crear cita",{
                    position: Toast.positions.CENTER,
                });
                navigation.goBack();
                
               } 

      
    
        }
    });


    return (
        <>
        
        <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
        />

   
            
            <ScrollView>
            <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
   
    
                {/* <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`ID cita`} disabled={true}
                name="idCita"
                value={formik.values.idCita}
                
                /> */}
                {/* <TextInput 
                mode="flat"
                style={styles.input} 
                label={`ID Facebook`} 
                name="idFaceook"
                disabled={true}
                value={formik.values.idFaceook}
                /> */}
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Nombre cliente`} 
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChangeText={(text)=>{formik.setFieldValue("name",text)}}
                />
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Telefono cliente`} 
                name="phone"
                keyboardType="numeric"
                value={formik.values.phone}
                error={formik.errors.phone}
                onChangeText={(text)=>{formik.setFieldValue("phone",text)}}
                />
    
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Fecha cita`}  
                name="fechaCita"
                value={formik.values.fechaCita}
                error={formik.errors.fechaCita}
                onChangeText={(text)=>{formik.setFieldValue("fechaCita",text)}}
                />
                
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Hora cita`} 
                name="horaCita"
                value={formik.values.horaCita}
                error={formik.errors.horaCita}
                onChangeText={(text)=>{formik.setFieldValue("horaCita",text)}}

                />
        
                
                
           
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Servicio`} 
                name="servicio"
                value={formik.values.service}
                error={formik.errors.service}
                onChangeText={(text)=>{formik.setFieldValue("service",text)}}
    
                />
    
    
          
    
    
                <RadioButton.Group 
                onValueChange={newValue => setValue(newValue)} value={value}
                >
                    <View style={styles.statusCitaContainer} >
                    <List.Subheader >Status de la cita</List.Subheader>
                    <View style={styles.marginTop} >
                        <Text>Pendiente</Text>
                        <RadioButton value="Pendiente" />
                    </View>
                    <View style={styles.marginTop}>
                        <Text>Cancelada</Text>
                        <RadioButton value="Cancelada" />
                    </View>
                    <View style={styles.marginTop}>
                        <Text>Completada</Text>
                        <RadioButton value="Completada" />
                    </View>
                    </View>
                    </RadioButton.Group>
    
                <Button 
                mode="contained" 
                style={styles.buttom}
                loading={loading}
                onPress={formik.handleSubmit}
                >
                {
        
                    "Crear cita"
                }
                </Button>
    
    
    
    
    
            </View>
            </KeyboardAwareScrollView>
            </ScrollView>
          
     
        
        </>
    )
}


const initialValues = () => {
    return {

        service: "",
        horaCita:"",
        fechaCita:"",
        phone:"",
        name:"",
        userId:""
    }
}



const validationSchema = () => {
    return {

        service: Yup.string().required(true),
        horaCita:Yup.string().required(true),
        fechaCita:Yup.string().required(true),
        phone:Yup.number().required(true),
        name:Yup.string().required(true),
        userId:Yup.string(),
    }
}


const styles = StyleSheet.create({
    container:{

    },
    title:{
    
    marginLeft:10,
    marginTop:15,
    fontSize:20
    },
    input:{
        backgroundColor:"#FFF",
        width: "100%",
        marginTop:15,
        marginBottom:15
        
        
    },
    buttom:{
        marginTop:50,
        width: "80%",
        backgroundColor:"#0681be",
        paddingVertical:5,
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom:50
    },
    list:{
        width: "80%",
    },
    statusCitaContainer:{
        marginTop:20,

    },
    marginTop:{
        marginTop:25,
        marginLeft:15

    }
})