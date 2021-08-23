import React,{ useState, useEffect } from 'react'
import { View, Text , StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import { API_URL } from "../../utils/constants"



export default function UserInfo({userInfo,PickImage}) {
  

     



    return (

        <View style={styles.container}>

            <TouchableOpacity onPress={()=> PickImage("ImageProfile")}>
            <Avatar.Image size={50} style={styles.avatar} source={{uri:`${API_URL}/${userInfo.imageProfile}`}}  />
            </TouchableOpacity>
            <View>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.titleName}>
            {
                userInfo?.name
            }
            </Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        alignItems:"center",
        padding: 20,
        flexDirection:"row"
 
    },
    title:{
        fontSize:20
    },
    titleName:{
        fontSize:20,
        fontWeight:"bold"
    },
    avatar:{
        marginRight:20,
        backgroundColor:"#FFF"
    }
})