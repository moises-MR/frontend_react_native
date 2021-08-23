import { API_URL } from "../utils/constants";
import useAuth from "../hooks/useAuth"




export const registerApi = async (user) => {

    const { name , email, password, idFacebook, tokenFacebook, realizaCitas,daysAndHours,chatbotActive, imageProfile, imageBackgroundWhats } = user;
    try {
    
        const url = `${API_URL}/create-user`;
        const params =  {
            method:"POST",
            headers:{
             "Content-type" : "application/json",

            },
            body:JSON.stringify({name,email,password,idFacebook,tokenFacebook,realizaCitas,daysAndHours,chatbotActive,imageProfile,imageBackgroundWhats})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}




export const loginApi = async (user) => {

    const { email, password } = user;
    try {
    
        const url = `${API_URL}/login`;
        const params =  {
            method:"POST",
            headers:{
             "Content-type" : "application/json",

            },
            body:JSON.stringify({email,password})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}



export const getUserApi = async (id,token) => {

    try {
        const url = `${API_URL}/user/${id}`
        const params = {
            headers:{
            "Content-Type" : "application/json",  
            Authorization : `Bearer ${token}`
            }
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
    }
}


export const upDateUserApiName = async (id,dato,token) => {


    try {
    
        const url = `${API_URL}/userName/${id}`

        const params =  {
            method:"PUT",
            headers:{
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`
        
            },
            body:JSON.stringify({id,dato})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}



export const upDateUserApiEmail = async (id,dato,token) => {


    try {
    
        const url = `${API_URL}/userEmail/${id}`

        const params =  {
            method:"PUT",
            headers:{
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`

            },
            body:JSON.stringify({id,dato})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}


export const upDateUserApiPassword = async (id,dato,token) => {


    try {
    
        const url = `${API_URL}/userPassword/${id}`

        const params =  {
            method:"PUT",
            headers:{
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`

            },
            body:JSON.stringify({id,dato})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}



export const descativarChatApi = async (id,dato,token) => {


    try {
    
        const url = `${API_URL}/chatbot/${id}`

        const params =  {
            method:"PUT",
            headers:{
             "Content-type" : "application/json",
             Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({id,dato})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return
    }

}




