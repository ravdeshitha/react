import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [holdData, setHoldDtat] = useState('');//store the loging input temporary
    const [OTPnum, setOTPnum] = useState();//save the otp number come from sever

    const setOTPWithTime = (otp) =>{
        setOTPnum(otp);
        setTimeout(() =>{
            setOTPnum();
        }, 180000);
    };

    const login = async(input) =>{
        try{
            const res = await axios.post("https://test-repo-2xuo.onrender.com/api/user/login", input, {
                withCredentials: true,
            });
            
            if(res.data.message === "success"){
                setCurrentUser(res.data.currentUser);//save currentUser details 
                return "success";
            }
            return "not success";
            
        }
        catch(err){
            return "login error";// this error come for any api error
        }
    }
    
    //login user identify function (if usere is a admin, should verify OTP also)
    const userIdentify = async(input, setIsOTPForm) =>{

        //temporary save username and password on holdData
        setHoldDtat(input);

        //inut is data of login and setIsOTPForm for set user form type(login form to OTP send form)
        try{
            const res = await axios.post("https://test-repo-2xuo.onrender.com/api/user/userIdentify", input);


            if(res.data.userType){//check userType is existing
                if(res.data.userType === 'admin'){
                    //if user is admin then should verify the OTP
                    setIsOTPForm(true);
                    return "Verify OTP";
                }
                else{
                    //this for other users( they don't want to verify the OTP )
                    const logres = await login(input);
                    setIsOTPForm(false);
                    if(logres === "success"){//login success message
                        return "User Login Success";
                    }else{
                        return "User Login Unsuccess";
                    }
                }
            }
            else{
                return "Login identify failed";
            }
        }
        catch(err){
            console.log(err, "login has an erre");
        }
    }

    //send OTP number 
    const sendOTP = async() =>{
        
        try{
            const res = await axios.get("https://test-repo-2xuo.onrender.com/api/user/sendOTP");
            setOTPWithTime(res.data);//save the OTP number 
        }
        catch(err){
            console.log(err, "OTP number send has an error");
        }
        
    }

    //admin check OTP and finish the login
    const verifyOTP = async(OTP) =>{
        if(OTP == OTPnum){//check entered OTP and server generated OTP
            const res = await login(holdData);//if OTP verified then call login function with holdData
            if(res === "success"){
                return "Admin User Login Success";
            }else{
                console.log(res);//this console.log show the message come from login function
                return "User Login Unsuccess";
            }
        }
        else{
            return "OTP is incorrect";
        }
    }

    //save the user details in localstorage
    useEffect(() =>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);//save the currentuser details in localstorage

    return (
        <AuthContext.Provider value={{currentUser, userIdentify, sendOTP, verifyOTP}} >
            {children}
        </AuthContext.Provider>
    )
}