import React from 'react';
import {StyleSheet } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcons from "react-native-vector-icons/FontAwesome";
import Home from '../screen/Home';
import ChatNavigation from './ChatNavigation';
import CitasNaviation from "../navigation/CitasNavigation";
import AccountMenuNavigation from "./AccountMenuNavigation"

const Tab = createMaterialBottomTabNavigator();


export default function BottomNavigation() {



    return (
   <NavigationContainer>
       <Tab.Navigator
          barStyle={styles.navigation}
          screenOptions={({route})=>({
            tabBarIcon: () =>{
              return setIcon(route);
            }
          })}
       >

          <Tab.Screen
          name="home"
          component={Home}
          options={{
              title:"Inicio"
          }}/>

       
        <Tab.Screen
          name="chats-tab"
          component={ChatNavigation}
          options={{
              title:"Mensajes",
              
          }}/>

        <Tab.Screen
          name="citas"
          component={CitasNaviation}
          options={{
              title:"Citas",
              
          }}/>

        <Tab.Screen
          name="account"
          component={AccountMenuNavigation}
          options={{
              title:"Cuenta"
          }}/>

       </Tab.Navigator>
   </NavigationContainer>
    )
}






const setIcon = (route) =>{

    let iconName = "";
  
    switch (route.name) {
      case "home":
          iconName = "home"
        break;
  
      case "chats-tab":
          iconName = "comments"
        break;
  
   
  
      case "account":
          iconName = "bars"
        break;

        case "citas":
          iconName = "calendar"
        break;
    
      default:
        break;
    }
    return  <AwesomeIcons 
    name={iconName}
    style={styles.icon}
    />
   
  }





const styles = StyleSheet.create({
    navigation:{
      backgroundColor:"#e63946"
    },
    icon:{
 
      fontSize:20,
      color: "#fff"
    }
  });