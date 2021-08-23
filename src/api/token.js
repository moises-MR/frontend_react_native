import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../utils/constants";



export const setTokenStorage = async (token)=>{
    try {
     await AsyncStorage.setItem(TOKEN,token)   
    } catch (error) {
        return null
    }
}


export const getTokenStorage = async ()  =>{
    try {
   const token = await AsyncStorage.getItem(TOKEN);
   return token;
    } catch (error) {
        return null;
    }
}


export const deleteTokenStorage = async ()  =>{
    try {
  await AsyncStorage.removeItem(TOKEN);
  return true
    } catch (error) {
        return null;
    }
}