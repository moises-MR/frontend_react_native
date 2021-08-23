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
import { upDateUserApiName } from "../../api/Auth"


export default function ChangeName(props) {

const { route:{params:{_id}}} = props

    
const [loading,setLoading] = useState(false);    

const { auth } = useAuth();

const navigation = useNavigation();



useFocusEffect(

    useCallback(()=>{

       (async()=>{
        
        const user = await getUserApi(_id,auth.token);
        
        user.name && formik.setFieldValue("name",user.name);

       })() 
    },[])
 )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:Yup.object(validationSchema()),
        onSubmit:async(formData)=>{

            setLoading(true);

            try {
                
              
                await upDateUserApiName(_id,formData.name,auth.token);
                
                Toast.show("Tu nombre a sido cambiado",{
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
       label="Nombre"
       onChangeText={(text)=> formik.setFieldValue("name",text)}
       value={formik.values.name}
       error={formik.errors.name}
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
        name:"",
    
    }
}

const validationSchema = ()=>{
    return {
        name:Yup.string().required(true),
    }
}





const styles = StyleSheet.create({

    container:{
        padding: 20
    }
})