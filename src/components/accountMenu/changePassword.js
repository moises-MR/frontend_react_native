import React,{  useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput , Button } from "react-native-paper";
import { formStyle } from "../../styles"
import { useFormik } from "formik";
import * as Yup from "yup";
import {  useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth"
import { upDateUserApiPassword } from "../../api/Auth"


export default function ChangeName(props) {

const { route:{params:{_id}}} = props

const  { auth } = useAuth()
    
const [loading,setLoading] = useState(false);    



const navigation = useNavigation();





    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async(formData)=>{

            setLoading(true);

            try {
                
              
                await upDateUserApiPassword(_id,formData.password,auth.token);
                
                Toast.show("Tu contaseña a sido actualizada",{
                    position: Toast.positions.CENTER,
                });
                navigation.goBack();
            } catch (error) {

                Toast.show("Error no se puedo actuzalizar",{
                    position: Toast.positions.CENTER,
                });

                setLoading(false);
                 
                    
            }


            
        }
    })









    return (
   <View style={styles.container}>
       <TextInput
       style={formStyle.input}
       label="Nueva contraseña"
       name="password"
       onChangeText={(text)=> formik.setFieldValue("password",text)}
       error={formik.errors.password}
       secureTextEntry
       />
       <TextInput
       style={formStyle.input}
       label="Repetir nueva contraseña"
       name="passwordRepeat"
       onChangeText={(text)=> formik.setFieldValue("passwordRepeat",text)}
       error={formik.errors.passwordRepeat}
       secureTextEntry
       />
     
       <Button
       mode="contained"
       style={formStyle.btnSucces}
       onPress={()=>{}}
       onPress={formik.handleSubmit}
       loading={loading}
       >
           Cambiar 
       </Button>
   </View>
    )
}



// valores de los inputs

const initialValues = ()=>{
    return {
        password:"",
        passwordRepeat:""
    }
}

const validationSchema = ()=>{
    return {
        password:Yup.string().required(true).min(6),
        passwordRepeat:Yup.string().required(true).oneOf([Yup.ref("password")],true),
    }
}





const styles = StyleSheet.create({

    container:{
        padding: 20
    }
})