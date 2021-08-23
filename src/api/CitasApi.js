import { API_URL } from "../utils/constants";

export const getCitasApi = async (id,token) =>{

    try {
        const url = `${API_URL}/citas/${id}`;
        const params = {
            headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
            }
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

} 




export const guardaDatosCita = async (_id,daysAndHours,service,token) => {

    try {
        
    const url = `${API_URL}/newcita/${_id}`;
    const params = {
        method:"post",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify({ _id,daysAndHours,service})
        

    }
    const response = await fetch(url,params);
    const result = await response.json();
    return result;    
    } catch (error) {
        console.log(error);
    }
}



export const getOnlyAppoimentApi = async (id,token) =>{

    try {
        const url = `${API_URL}/citasOnly/${id}`;
        const params = {
            headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`

            }
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

} 



export const putAppoimentApi = async (id,appoiment,token) =>{

    try {
        const url = `${API_URL}/citasOnly/${id}`;
        const params = {
            method:"PUT",
            headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({ id,appoiment})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

} 


export const postAppoimentCompleteApi = async (id,complete,token) =>{

    try {
        const url = `${API_URL}/citasOnly/${id}`;
        const params = {
            method:"POST",
            headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
            },
            body:JSON.stringify({ id,complete})
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

} 



export const deleteAppoimentApi = async (id,token) =>{

    try {
        const url = `${API_URL}/citasOnly/${id}`;
        const params = {
            method:"DELETE",
            headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`

            },
        };
        const response = await fetch(url,params);
        const result = await response.json();
        return result
    } catch (error) {
        console.log(error);
    }

} 