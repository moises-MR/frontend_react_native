import React from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import colors from "../styles/colors"
import AccountMenu from "../screen/AccountMenu";
import DaysCitas from "../components/accountMenu/dayCitas";
import horasLaborales from "../components/accountMenu/horasLaborales";
import ConfirmCita from "../components/accountMenu/ConfirmCita";
import ChangeName from '../components/accountMenu/ChangeName';
import ChangeEmail from "../components/accountMenu/chageEmail";
import changePassword from "../components/accountMenu/changePassword";
import Services from '../components/accountMenu/Services';

const Stack = createStackNavigator();


export default function MenuNavigation() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTintColor:colors.fontLight,
            headerStyle:{backgroundColor:colors.bgDark},
            cardStyle:{
                backgroundColor:colors.bgLight
            }
           
        }}>



            <Stack.Screen
            name="menu"
            component={AccountMenu}
            options={{title:"Mensajes",headerShown:false}}
            />
            
            <Stack.Screen
            name="daysCitas"
            component={DaysCitas}
            options={{title:"Dias laborales",headerShown:true,headerBackTitleVisible:false}}
            />

            <Stack.Screen
            name="services"
            component={Services}
            options={{title:"servicios",headerShown:true,headerBackTitleVisible:false}}
            />

            <Stack.Screen
            name="horasLaborales"
            component={horasLaborales}
            options={{title:"Horas laborales",headerShown:true,headerBackTitleVisible:false}}
            />

            <Stack.Screen
            name="confirm-citas"
            component={ConfirmCita}
            options={{title:"Confirmar servicio",headerShown:true,headerBackTitleVisible:false}}
            />


            <Stack.Screen
            name="changeName"
            component={ChangeName}
            options={{title:"Cambiar nombre",headerShown:true,headerBackTitleVisible:false}}
            />

            <Stack.Screen
            name="changeEmail"
            component={ChangeEmail}
            options={{title:"Cambiar email",headerShown:true,headerBackTitleVisible:false}}
            />

            
            <Stack.Screen
            name="changePassword"
            component={changePassword}
            options={{title:"Cambiar contraseña",headerShown:true,headerBackTitleVisible:false}}
            />

        </Stack.Navigator>
    )
}
