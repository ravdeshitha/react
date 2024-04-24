import axios from "axios";

export const AdminVerify = async() =>{
    const result = await axios.get(`${import.meta.env.VITE_SERVER}/api/user/verifyAdmin`,{withCredentials: true});
    if(result.data === "pass"){
        return true;
    }
    else{
        return false;
    }
}