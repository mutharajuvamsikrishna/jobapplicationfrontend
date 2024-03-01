import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import "./Application.css";
import { getProfiles } from './Services/Api';

const Applicantshome = () => {

  const [formdata, setFormData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access the data object passed from the previous route
  const data = location.state.data;
  const email = data.email;

  useEffect(() => {
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployeeData = (email) => {
   // axios
   //   .get(`http://localhost:1279/reg?email=${email}`)
   
   getProfiles(email)
      .then((response) => {
      
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        
      
        console.error('AxiosError:', error.message);
        console.error('Error details:', error.response); 
      });
  };
 

  const ename = formdata.ename;

  const handleSubmit = (event) => {
    const data1={   
ename:ename,
email:email
    }
   
    event.preventDefault();
    navigate("/application", { state: { data: data1 } });

    
  }

  const handleSubmit1 = (event) => {
    event.preventDefault();
    navigate("/viewapplication", { state: { data: data } });
  }

  const handleSubmit2 = () => {
    navigate("/profile", { state: { data: data } });
  }
  if(ename===undefined){
    navigate("/loginfail")
      
    }

  return (
    <>
  
    <div
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={handleSubmit2}
    >
      <CgProfile
        style={{
          height: "50px",
          width: "50px",
          color:"blue"
        }} />
    </div>
    <div className='id3'>
        <center>
          
          <h1 style={{ color: 'green' }}>Welcome {ename}</h1>
          <br /><br/>
          <button className='btn btn-primary ' onClick={handleSubmit}>New Application</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className='btn btn-primary' onClick={handleSubmit1}>View Application</button>
        </center>
    </div>
    </>
  );
};

export default Applicantshome;
