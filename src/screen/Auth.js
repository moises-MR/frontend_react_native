import React ,{useState}from 'react';
import { StyleSheet,
    ScrollView, Text, Image, View,
    KeyboardAvoidingView, Platform } from 'react-native';
import logo from "../img/impulsa-logo.png";
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';







const Auth = () => {



const [showLogin,setShowLogin] = useState(true);


// Funcion para cambiar de formulario
const changeForm = () => setShowLogin(!showLogin);


   


    return ( 

        <ScrollView>
          
            <Image style={styles.logo} source={logo}/>
     {/* Es para que el teclado se ajuste a los inputs */}
        <KeyboardAvoidingView
        behavior={Platform.OS ==="ios" ? "padding" : "height"}
        >
        {
        showLogin 
        ? 
        <LoginForm
        changeForm={changeForm}
        />
        :
        <RegisterForm
        changeForm={changeForm}
        />
        }
        </KeyboardAvoidingView>

        </ScrollView>
     );
}
 
export default Auth;



const styles = StyleSheet.create({

    logo:{
    
        width: "60%",
       resizeMode:'contain',
       marginLeft:"auto",
       marginRight:"auto",
       marginBottom:20,
       marginTop:30

    },
   

})


