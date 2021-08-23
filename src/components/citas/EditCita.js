import React,{ useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import StatusBarCustom from '../../status_bar/StatusBar';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from '../../styles/colors';
import { Button, List,RadioButton } from 'react-native-paper';
import { getOnlyAppoimentApi, putAppoimentApi } from "../../api/CitasApi"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import ScreenLoading from "../../layouts/ScreenLoading";
import * as Yup from "yup";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import useAuth from '../../hooks/useAuth';



export default function EditCita(props) {

    const { auth } = useAuth();
    const { route:{params:{id}}} = props;

    const navigation = useNavigation();
   

    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [appiomenit, setAppiomenit] = useState(null);

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                setAppiomenit(null);
                const cita = await getOnlyAppoimentApi(id,auth.token)
                setAppiomenit(cita)
                setValue(cita[0]?.complete)

                formik.setFieldValue("idCita",cita[0]?._id)
                formik.setFieldValue("idFaceook",cita[0]?.idCreadorCita)
                formik.setFieldValue("name",cita[0]?.name)
                formik.setFieldValue("phone",cita[0]?.phone)
                formik.setFieldValue("fechaCita",cita[0]?.fechaCita)
                formik.setFieldValue("horaCita",cita[0]?.horaCita)
                formik.setFieldValue("servicio",cita[0]?.service)
 
           
            })()
        },[])
    )
    
        

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async (formData) =>{
            console.log("yea")
            setLoading(true)
            try {
                formData.complete = value;
                const response = await putAppoimentApi(id,formData,auth.token)
               if(response?.status === 200){
                Toast.show("Cita actualizada",{
                    position: Toast.positions.CENTER,
                });
                navigation.goBack();
               } 
            setLoading(false)

            } catch (error) {
            setLoading(false)
                console.log(error)
            }
        }
    });


    return (
        <>
        
        <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle="light-content"
        />

        {
        appiomenit
            ?
            
            <ScrollView>
            <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
   
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`ID cita`} disabled={true}
                name="idCita"
                value={formik.values.idCita}
                
                />
                <TextInput 
                mode="flat"
                style={styles.input} 
                label={`ID Facebook`} 
                name="idFaceook"
                disabled={true}
                value={formik.values.idFaceook}
                />
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Nombre`} 
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChangeText={(text)=>{formik.setFieldValue("name",text)}}
                />
    
                <TextInput 
                mode="flat" 
                style={styles.input} 
                label={`Telefono`} 
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
                value={formik.values.servicio}
                error={formik.errors.servicio}
                onChangeText={(text)=>{formik.setFieldValue("servicio",text)}}
    
                />
    
    
                {/* <List.Accordion
                    title="Uncontrolled Accordion"
                    left={props => <List.Icon {...props}  />}
                    style={styles.list}
                    
                >
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion> */}
    
    
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
        
                    "Editar cita"
                }
                </Button>
    
    
    
    
    
            </View>
            </KeyboardAwareScrollView>
            </ScrollView>
             :
             <ScreenLoading
             text="Cargando..."
             />
        }
        </>
    )
}


const initialValues = () => {
    return {
        idCita:"",
        idFaceook:"",
        servicio: "",
        horaCita:"",
        fechaCita:"",
        phone:"",
        name:"",
    }
}



const validationSchema = () => {
    return {
        idCita:Yup.string(),
        idFaceook:Yup.string(),
        servicio: Yup.string().required(true),
        horaCita:Yup.string().required(true),
        fechaCita:Yup.string().required(true),
        phone:Yup.number().required(true),
        name:Yup.string().required(true),
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