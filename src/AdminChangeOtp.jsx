import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { postAdminChangeOtp } from "./Services/Api";
const ChangeOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  // Access the data object passed from the previous route, if available
  const data = location.state.data;
 

  // const ename1 = data.email;

  const handleSubmit = (event) => {
    event.preventDefault();

    const otpdata = {
      otp: otp,
    };
    var v46= /^\d{6}$/;
    if (otpdata.otp.length != 6) {
      alert("OTP 6 digits only");
      return false;
    }
if(!otpdata.otp.match(v46)){
  alert("OTP 6 Digits Numeric Only")
  return false;
}

    // You can use axios to send the data to your backend server
  //  axios
   //   .post(`http://localhost:1279/adminotp5?otp=${otp}`, otpdata)
   postAdminChangeOtp(otp)
      .then((response) => {
        // Handle the response here if needed
        if (response.data === "adminchangeregsucess") {
          navigate("/adminchangepassword1", { state: { data: data } });
        } else {
          navigate("/invalidotp");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100vh' }}>
      <center>
        <br /><br /><br /><br /><br /><br />
        <h2 style={{ color: 'blue' }}>Enter Your  OTP </h2>
        <br/>
        <form onSubmit={handleSubmit}>
          {/* ... Your existing form elements ... */}
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <br /><br />
          <button type="submit" className='btn btn-primary' style={{fontSize:"18px"}}>Submit</button>
        </form>
        <br /><br />
        <a href="javascript:history.go(-1)">Go Back</a>
      </center>
    </div>
  );
};

export default ChangeOtp;
