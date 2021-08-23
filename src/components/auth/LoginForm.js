import React,{useState} from 'react';
import { View } from 'react-native';
import {TextInput,Button} from "react-native-paper";
import {useFormik} from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { formStyle } from "../../styles/";
import { loginApi } from "../../api/Auth"
import useAuth from "../../hooks/useAuth";





export default function LoginForm({changeForm}) {

// State para el loading del boton
const [loading,setLoading] = useState(false);

const { login } = useAuth()


const formik = useFormik({
    initialValues:initialValues(),
    validationSchema:Yup.object(validationSchema()),
    onSubmit:async(formData)=>{
        setLoading(true)
        try {
            const response = await loginApi(formData);

            //Usuaurio o contraseñas incorrctos
            if(response?.status === 401){
                setLoading(false)
                if(response.message === "User not exist"){
                    Toast.show("El usuairo no existe",{
                        position: Toast.positions.CENTER,
                    });
                    throw "El usuairo no existe"
                }
                if(response.message === "Icorrect password"){
                    Toast.show("Contaseña incorrecta",{
                        position: Toast.positions.CENTER,
                    });
                    throw "Contaseña incorrecta"
                }
                 
            }

            if(response?.status === 200) login(response);


           } catch (error) {
           
            console.log(error);
           }

    }
})



    return (
        <View>
          <TextInput 
          style={formStyle.input} 
          label="Email"
          onChangeText={(valueInput)=>{ formik.setFieldValue("email",valueInput)}}
          value={formik.values.email}
          error={formik.errors.email}
          />

          <TextInput 
          label="Contaseña"
          style={formStyle.input}
          onChangeText={(valueInput)=>{ formik.setFieldValue("password",valueInput)}}
          value={formik.values.password}
          error={formik.errors.password}
          secureTextEntry
          />


          <Button 
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
          >Entrar</Button>


          <Button 
          mode="text"
          style={formStyle.btnText}
          labelStyle={formStyle.btnTextLabel}
          onPress={()=>{changeForm();}}
          >registrarme</Button>
        </View>
    )
}



const initialValues = () => (
    {
        email:"",
        password:""

    }
)


const validationSchema = ()=>(
    {
        email:Yup.string().required(true),
        password:Yup.string().required(true).min(6)

    }
)