import React,{useState} from 'react'
import { View, ScrollView } from 'react-native';
import { TextInput, Button} from "react-native-paper";
import {useFormik} from "formik";
import * as Yup from "yup";
import { registerApi } from "../../api/Auth";
import Toast from "react-native-root-toast";
import {formStyle} from "../../styles"

export default function RegisterForm({changeForm}) {

    // State para el spinner de carga
    const[loading,setLoading]=useState(false);

   

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async(formData)=>{
            setLoading(true);
            formData.idFacebook = null;
            formData.tokenFacebook = null;
            formData.realizaCitas = false;
            formData.daysAndHours = [];
            formData.chatbotActive = false;
            formData.imageProfile = "544ec0d2209b09f125f40fbe6d5d9090.jpeg",
            formData.imageBackgroundWhats = "8fbacbd464e996966eb9d4a6b7a9c21.jpg"
            
            try {
             const user = await registerApi(formData);
                if(user){
                    Toast.show("Cuenta creada con exito",{
                        position: Toast.positions.CENTER,
                    });
                    changeForm();  
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
    })


    return (
        <View>
            <TextInput 
            label="Nombre" 
            style={formStyle.input}
            onChangeText={(text)=>{formik.setFieldValue("name",text)}}
            value={formik.values.name}
            error={formik.errors.name}

            />
            <TextInput 
            label="Email" 
            style={formStyle.input} 
            onChangeText={(text)=>{formik.setFieldValue("email",text)}}
            value={formik.values.email}
            error={formik.errors.email}

            />
            <TextInput 
            label="Contaseña" 
            style={formStyle.input} 
            secureTextEntry 
            onChangeText={(text)=>{formik.setFieldValue("password",text)}}
            value={formik.values.password}
            error={formik.errors.password}


            />
            <TextInput 
            label="Repetir contraseña" 
            style={formStyle.input} 
            secureTextEntry 
            mode="flat"
            onChangeText={(text)=>{formik.setFieldValue("passwordRepeat",text)}}
            value={formik.values.passwordRepeat}
            error={formik.errors.passwordRepeat}

            />
            <Button 
            mode="contained"
            style={formStyle.btnSucces}
            onPress={formik.handleSubmit}
            loading={loading}
            >
                Registrarme
            </Button>
            <Button 
            style={formStyle.btnText}
            labelStyle={[formStyle.btnText,formStyle.btnTextLabel]}
            onPress={changeForm}
            >
                Iniciar sesion
            </Button>
        </View>
    )
}




const initialValues = ()=>(
    {
        name:"",
        email:"",
        password:"",
        passwordRepeat:"",

    }
)



const validationSchema = ()=>(
    {
    name:Yup.string().required(true),
    email:Yup.string().email(true).required(true),
    password:Yup.string().required(true).min(6),
    passwordRepeat:Yup.string().required(true).oneOf([Yup.ref("password")],true),



    }
)