import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import "./ViweAll.css";
//import { SlLogout } from "react-icons/Sl";
import { SlLogout } from "react-icons/Sl";
import { BsPersonFillAdd } from "react-icons/bs";
import { geAdminProfiles,getViewAddmore } from './Services/Api'
import { useNavigate } from "react-router-dom";
const AdminProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState([]);
  const location = useLocation();
const navigate=useNavigate();
  const email = location.state.data.email;
  const data = {
    email: email,
  };
  useEffect(() => {
    fetchEmployee();
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployee = () => {
  //  axios
   // .get(`http://localhost:1279/adminreg?email=${email}`)
   geAdminProfiles(email)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
        if(!localStorage.getItem('jwtToken')){
          navigate("/adminlogin")
          }
      });
  };

  const fetchEmployeeData = (email) => {
 //   axios
    //  .get(`http://localhost:1279/viewaddmore?email=${email}`)
    getViewAddmore(email)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
const empid=formData.empid;

const data1={
  empid:empid
 
}
const handleLogOut=()=>{
  localStorage.clear();
  navigate("/adminlogin")
}
const handleAddmore=()=>{
  navigate("/adminaddmore", { state: { data: data } });
}
return (
  <div className="container6" style={{padding:"7%"}}>
   
    <div>
      <h3 style={{ textDecoration: "underline", color: "blue", textAlign: "center" }}>Profile</h3>
    </div>
    <div>
      <br />
      {employee && (
        <div className="row justify">
          <center>
            <table  className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{employee.ename}</td>
               
                  <td>Email</td>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <td>Mobile Number</td>
                  <td>{employee.mob}</td>
                  <td>Status</td>
                  <td style={{color:"green"}}>online</td>
                </tr>
              </tbody>
            </table>
          </center>

          <div className="profile-info">
            <br/>
            <center>
             <button onClick={handleLogOut}>
              <SlLogout
              style={{height:"50px",width:"50px"}}/><br/>
              LogOut
             </button>
            </center>
          </div>
        </div>
      )}
    </div>

    <br /> <br />
    <center>
      <a href="javascript:history.go(-1)">Go Back</a>
    </center>
  </div>
);
};

export default AdminProfile;