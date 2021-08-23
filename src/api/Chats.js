import { API_URL } from "../utils/constants";





export const getChatsApi = async (id,token) =>{
    try {
        const url = `${API_URL}/chats/${id}`;
        
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


export const getChatUserApi = async (id,token) => {
    

    try {
        
    const url = `${API_URL}/chat/${id}`;
    const params = {
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`

        }
    }
    const response = await fetch(url,params);
    const result = await response.json();
    return result;    
    } catch (error) {
        console.log(error);
    }
}








export const upDateMessagesApi = async (_id,message,messageAsesor,token) => {

    try {
        
    const url = `${API_URL}/chat/${_id}`;
    const params = {
        method:"post",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body:JSON.stringify({ _id,chatAsesor:message,message:messageAsesor})

    }
    const response = await fetch(url,params);
    const result = await response.json();
    return result;    
    } catch (error) {
        console.log(error);
    }
}