import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
const Success = () => {
  
  const location = useLocation();

 
 const navigate =useNavigate();
  // Access the data object passed from the previous route
  const data = location.state.data;
  const ename = data.email;
 
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/loginsucess", { state: { data: data } }); // Use navigate to change the rout
  }
  const handleSubmit2 = () => {
    navigate("/profile", { state: { data: data } });
  }
  return (
    <div>
     
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
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <center>
        <h1 style={{ color: 'green' }}>Hello {ename}</h1>
        <br />
        <h1 style={{ color: 'green', textAlign: 'center' }}>Save Details SuccessFully</h1>
        
        {/* Pass the data object as state to the /viewapplication route */}
        <button className='btn btn-primary' onClick={handleSubmit}>Go Back</button>
        
        
      </center>
    </div>
  );
};

export default Success;
