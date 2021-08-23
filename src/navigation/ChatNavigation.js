import React from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Chats from "../screen/Chats";
import Chat from "../components/Chat";
import colors from "../styles/colors"

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
            name="chats"
            component={Chats}
            options={{title:"Mensajes",headerShown:false}}
            />
            
            <Stack.Screen
            name="chat"
            component={Chat}
            options={{title:"Chat",headerShown:true,headerBackTitleVisible:false}}
            />

        </Stack.Navigator>
    )
}
