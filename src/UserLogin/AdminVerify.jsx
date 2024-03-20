import axios from "axios";

export const AdminVerify = async() =>{
    const result = await axios.get("https://test-repo-2xuo.onrender.com/api/user/verifyAdmin",{withCredentials: true});
    
    if(result.data === "pass"){
        return true;
    }
    else{
        return false;
    }
}