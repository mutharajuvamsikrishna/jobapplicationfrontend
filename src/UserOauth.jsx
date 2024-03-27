import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import "./Application.css";
const UserOauth = () => {
    const location = useLocation();
    const navigate = useNavigate();
const [loading,setLoading]=useState(false);
    useEffect(() => {
setLoading(true)
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const email = params.get('email');
const data={
email:email
}
        // Now you have access to the token and email, you can use them as needed
       
        localStorage.setItem('jwtToken',token);
        navigate("/loginsucess", { state: { data: data } });
    }, [location.search]);

    if (loading) {
        return (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h4 className="me-2">Loading</h4>
            <div className="spinner-grow text-primary " role="status">
      <span className="sr-only"></span>
    </div>
    <div className="spinner-grow text-secondary ms-2" role="status">
      <span className="sr-only"></span>
    </div>
          </div>
          
        );
      }
};

export default UserOauth;
