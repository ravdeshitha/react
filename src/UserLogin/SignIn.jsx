import {useState, useEffect, useContext} from 'react';
import SignInForm from "./SignPages/SignInForm";
import SidePhoto from "./SignPages/SidePhoto";
import { AuthContext } from '../context/AuthContext';
import {useCookies} from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const {userIdentify, sendOTP, verifyOTP} = useContext(AuthContext);

  const [isOTPForm, setIsOTPFrom] =useState(false);
  const [isSendBut, setIsSendBut] = useState(true);

  //User login details
  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
  });

  //OTP password
  const [otp, setOtp] = useState('');

  //use cookies for set time to sendOTP button(Only can send OTP again after cookie expire)
  const [cookies, setCookie] = useCookies(['otpSendTime']);

  const navigate = useNavigate();

  //submit user loging details for identify the user(admin or usr)
  const userSubmit = async (e) =>{
    e.preventDefault();

    try{
      const result = await userIdentify(user, setIsOTPFrom);
      
      if(result === 'User Login Success'){
        navigate('/');
      }
    }
    catch(err){
      console.log(err);
    }
  }

  //send the otp number
  const requestOTP =() =>{
    const result = sendOTP();
    setCookie('otpSendTime', true, {path: '/' , maxAge: 20}) //time = 3min(180sec)
    setIsSendBut(false);
  }

  //verify the otp number
  const OTPverify = async(e) =>{
    e.preventDefault();
    try{
      const result = await verifyOTP(otp);
      console.log(result);
      navigate('/');
    }
    catch(err){
      console.log(err);
    }
  };


  return (
    <div>
      {!isOTPForm ? (

        //sign in form 

        <div className="md:mt-[20vh] w-[95%] md:w-[55%] m-10 flex lg:flex-col justify-center mx-auto drop-shadow-2xl border-4 border-slate-150">
          <div className="w-full h-[90vh] md:h-[60vh] lg:flex item-start">
          <SidePhoto />

            <div className=" absolute lg:relative z-20 w-full lg:w-1/2 h-full lg:flex lg:flex-col justify-center">
              <div className="mx-5 mt-[25vh] lg:bg-opacity-10 lg:mt-0 ">
                <SignInForm setUser={setUser} userSubmit={userSubmit}/>
              </div>
            </div>
          </div>
        </div>
      ):(
        //OTP verification forms (only for admin users)
        <div className=' h-[100vh] flex justify-center items-center '>
          <form className='bg-slate-200 w-[25%] p-10 shadow-lg shadow-slate-600 '>
            
            {isSendBut && !cookies.otpSendTime ? (
              //*Send OTP button (if already send the OTP this button not show till time is end)
              <>
                <h3 className='text-center text-[25px] font-semibold text-red-900'>Request OTP code</h3>

                <p className='text-left font-medium mt-3'>Request One Time Password(OTP) to your registered Phone Number</p>

                <button 
                  type='submit' 
                  className='w-[100%] h-10 bg-red-900 text-white font-bold mt-3 ' 
                  onClick={requestOTP}
                >Send OTP</button>
              </>

            ):(

              //OTP send form 
              <>
                <h3 className='text-center text-[25px] font-semibold text-red-900'>Please Enter OTP</h3>

                <p className='text-left font-medium mt-3'>Your One Time Password(OTP) sent via SMS to your registered Phone Number</p>
                <div className='flex flex-col mt-4'>
                  <input 
                    type='text' 
                    placeholder='Enter OTP' 
                    className='w-[100%] h-10 p-4 outline-none' 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button 
                    type='submit' 
                    className='w-[100%] h-10 bg-red-900 text-white font-bold mt-3 ' 
                    onClick={OTPverify}
                  >Submit OTP</button>
                </div>
              </>

            )}

          </form>
        </div>
      )}
      
      
    </div>
  );
}
