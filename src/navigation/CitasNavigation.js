import React from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import colors from "../styles/colors"
import EditCita from "../components/citas/EditCita";
import NewAppoimet from "../components/citas/NewAppoimet";
import CitaScreen from "../screen/Citas";

 

const Stack = createStackNavigator();

export default function Navigation() {
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
            name="list-citas"
            component={CitaScreen}
            options={{title:"Mis citas",headerShown:false}}
            />

        <Stack.Screen
            name="edit"
            component={EditCita}
            options={{title:"Editar cita",headerShown:true,headerBackTitleVisible:false}}
            />
        
        <Stack.Screen
            name="newAppoiment"
            component={NewAppoimet}
            options={{title:"Nueva cita",headerShown:true,headerBackTitleVisible:false}}
            />

        


        </Stack.Navigator>
    )
}
