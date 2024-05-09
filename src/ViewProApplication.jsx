import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiOutlineFullscreen, AiOutlineCompress } from "react-icons/ai";
import "./ViweAll.css";
import { CgProfile } from "react-icons/cg";
import { getUserView } from "./Services/Api";
const ViewProApplication = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email1 = location.state.data.email;
  const email = location.state.data.email;
  const data = {
    email: email,
  };
  useEffect(() => {
    fetchEmployees();
  }, [email1]);

  const fetchEmployees = () => {
    getUserView()
      .then((response) => {
        // Assuming response.data is an array of employee objects with an 'email' property
        const filterData = response.data.filter(
          (employee) => employee.email === email1
        );
        setEmployees(filterData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit3 = () => {
    navigate("/profile", { state: { data: data } });
  };

  return (
    <div className="id1">
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={handleSubmit3}
      >
        <CgProfile
          style={{
            height: "50px",
            width: "50px",
            color: "blue",
          }}
        />
      </div>
      <div style={{paddingTop:"80px"}}>
      
      <h3 className="mb-3 text-center">No of Applications {employees.length}</h3>
      </div>
      <br />
      <div className="row adj">
        <div className="d-flex mb-3">
<button className="btn btn-success" onClick={()=>navigate("/application", { state: { data: data } })}>Add New Job</button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Application Status</th>
              <th>ONiE Soft Job ID</th>
              <th>Applied Date</th>
              <th>InterView Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <React.Fragment key={emp.regno}>
                <tr>
                  <td>{emp.regno}</td>

                  <td>{emp.expy}</td>

                  <td>{emp.id}</td>
                  <td>{emp.prevEmployeeName2}</td>
                  <td>{emp.prevCompanyName2}</td>
                </tr>
              
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <br/>
      </div>
{/* 
      <center>
        <Link to="/loginsucess" state={{ data }}>
          Go Back
        </Link>
       
      </center> */}
      <br/>
      <br/>
    </div>
  );
};

export default ViewProApplication;
