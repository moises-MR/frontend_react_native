import React,{ useCallback , useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { TextInput , Button } from "react-native-paper";
import { formStyle } from "../../styles"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from '../../hooks/useAuth';
import Toast from "react-native-root-toast";
import { getUserApi } from "../../api/Auth"
import { upDateUserApiEmail } from "../../api/Auth"


export default function ChangeName(props) {

const { route:{params:{_id}}} = props

const { auth } = useAuth()
    
const [loading,setLoading] = useState(false);    



const navigation = useNavigation();



useFocusEffect(

    useCallback(()=>{

       (async()=>{
        
        const user = await getUserApi(_id,auth.token);
        user.email && formik.setFieldValue("email",user.email);

       })() 
    },[])
 )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async(formData)=>{

            setLoading(true);

            try {
                
              
                await upDateUserApiEmail(_id,formData.email,auth.token);
                
                Toast.show("Tu email a sido cambiado",{
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
       label="Email"
       onChangeText={(text)=> formik.setFieldValue("email",text)}
       value={formik.values.email}
       error={formik.errors.email}
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
        email:"",
    
    }
}

const validationSchema = ()=>{
    return {
        email:Yup.string().required(true).email(true),
    }
}





const styles = StyleSheet.create({

    container:{
        padding: 20
    }
})