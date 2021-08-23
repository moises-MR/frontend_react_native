import React,{} from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput , Button, List } from "react-native-paper";
import { formStyle } from "../../styles"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";




export default function ChangeName(props) {

const { route:{params}} = props

    



const navigation = useNavigation();




    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async(formData)=>{

            if(formData.service1 === "") delete formData.service1
            if(formData.service2 === "") delete formData.service2
            if(formData.service3 === "") delete formData.service3
            if(formData.service4 === "") delete formData.service4
            if(formData.service5 === "") delete formData.service5
            if(formData.service6 === "") delete formData.service6
            if(formData.service7 === "") delete formData.service7

            
            navigation.navigate("horasLaborales",{days:params,services:formData})
            
        }
    })









    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
   <View style={styles.container}>
<List.Subheader >¿ Que servicios ofreces ?</List.Subheader>

       <TextInput
       style={formStyle.input}
       label="Servicio 1"
       onChangeText={(text)=> formik.setFieldValue("service1",text)}
       />
        <TextInput
       style={formStyle.input}
       label="Servicio 2"
       onChangeText={(text)=> formik.setFieldValue("service2",text)}
       />
        <TextInput
       style={formStyle.input}
       label="Servicio 3"
       onChangeText={(text)=> formik.setFieldValue("service3",text)}
       />
        <TextInput
       style={formStyle.input}
       label="Servicio 4"
       onChangeText={(text)=> formik.setFieldValue("service4",text)}
       />
       <TextInput
       style={formStyle.input}
       label="Servicio 5"
       onChangeText={(text)=> formik.setFieldValue("service5",text)}
       />
       <TextInput
       style={formStyle.input}
       label="Servicio 6"
       onChangeText={(text)=> formik.setFieldValue("service6",text)}
       />
       <TextInput
       style={formStyle.input}
       label="Servicio 7"
       onChangeText={(text)=> formik.setFieldValue("service7",text)}
       />
     
       <Button
       mode="contained"
       style={formStyle.btnSucces}
       onPress={formik.handleSubmit}
       >
           siguiente 
       </Button>
   </View>
   </KeyboardAwareScrollView>
    )
}



// valores de los inputs

const initialValues = ()=>{
    return {
        service1:"",
        service2:"",
        service3:"",
        service4:"",
        service5:"",
        service6:"",
        service7:"",
    
    }
}

const validationSchema = ()=>{
    return {
        service1:Yup.string(),
        service2:Yup.string(),
        service3:Yup.string(),
        service4:Yup.string(),
        service5:Yup.string(),
        service6:Yup.string(),
        service7:Yup.string(),
    }
}





const styles = StyleSheet.create({

    container:{
        padding: 20
    }
})