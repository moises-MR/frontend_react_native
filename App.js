import React,{ useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as PaperProvider} from "react-native-paper";
import BottomNavigation from './src/navigation/BottomNavigation';
import AuthCotext from "./src/context/AuthContext";
import Auth from "./src/screen/Auth";
import { setTokenStorage,getTokenStorage,deleteTokenStorage } from "./src/api/token";
import jwtDecode from 'jwt-decode';

export default function App() {

  const [logoutInterruptor,setLogoutInterruptor] = useState(false)
  const [auth, setAuth] = useState(undefined);


  useEffect(()=>{
    (async()=>{
    
      const jwt = await getTokenStorage();
      if(jwt){
        setAuth({
          token:jwt,
           id:jwtDecode(jwt)._id
        });
      }else{
        setAuth(null)
      }

    })()
  },[logoutInterruptor])


const login = (userToken) => {


  setTokenStorage(userToken.token);
console.log(jwtDecode(userToken.token));
  setAuth({
    token:userToken?.token,
     id:jwtDecode(userToken?.token)?._id
  })
}


const logout = () => {
  setLogoutInterruptor(!logoutInterruptor),
  deleteTokenStorage()
}


const authData = useMemo(()=>{
  return{
  auth,
  login,
  logout,
  }
},[auth])



  if(auth === undefined) return null;

  return (
    <AuthCotext.Provider
    value={authData}
    >
    <PaperProvider>

    { 
    auth 
    ? 
    <BottomNavigation/> 
    : 
    <Auth/>
    }

  </PaperProvider>
  </AuthCotext.Provider>
  );
}


