import React,{ useEffect, useState, useCallback } from 'react';
import {  StyleSheet, ScrollView } from 'react-native';
import StatusBar from "../status_bar/StatusBar";
import colors from "../styles/colors";
import Banner from '../layouts/Banner';
import ServicesAdicionales from "../components/services/ServicesAdicionales";
import useAuth from "../hooks/useAuth"
import ScreenLoading from "../layouts/ScreenLoading";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useFocusEffect } from "@react-navigation/native"

export default function Home() {
    

    const { auth } = useAuth();

    const [imgBannerAndPromotions, setImgBannerAndPromotions] = useState(null)


    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                
                const settingsImage = await axios.get(`${API_URL}/admin/settings/image`,{
                    headers:{
                     Authorization : `Bearer ${auth.token}`
                    }
                })
                if(settingsImage){
                    setImgBannerAndPromotions(settingsImage)
                }
            })() 
    
        },[])
    )
    
  
    // if(imgBannerAndPromotions === null) return null


    // console.log(imgBannerAndPromotions?.data[0]?.imageAndPromotion)

    
    return (
        <>
        <StatusBar
            backgroundColor={colors.bgDark}
            barStyle="light-content"
            />
          {imgBannerAndPromotions === null
            ? 
            <ScreenLoading/>
            :
            <ScrollView>
            <Banner
            imgBannerAndPromotions={imgBannerAndPromotions}
            />

            {
            imgBannerAndPromotions?.data[0]?.imageAndPromotion.map((promotion)=>(
                <ServicesAdicionales
                url={promotion.image}
                key={promotion.image}
                message={promotion.message}
                />
              ))
            }
      

            </ScrollView>
          }
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
