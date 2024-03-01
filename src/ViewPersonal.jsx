import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiOutlineFullscreen, AiOutlineCompress } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { getViewAddmore } from "./Services/Api";
import "./ViweAll.css";
const ViewProApplication = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const location = useLocation();
  const email1 = location.state.data.email;
  const email = location.state.data.email;

  useEffect(() => {
    fetchEmployees();
  }, [email1]);
  const data = {
    email: email,
  };
  const fetchEmployees = () => {
    getViewAddmore(email)
      .then((response) => {
        setEmployees(response.data);
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit2 = (regno) => {
    const data = {
      regno: regno,
    };
    navigate("/editpersonal", { state: { data: data } });
  };

  const expand = (regno) => {
    setResponse(regno);
  };

  const expand1 = (regno) => {
    setResponse();
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
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">View Personal Details</h2>
      <h3 className="text-center">No of Customers {employees.length}</h3>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <React.Fragment key={emp.regno}>
                <tr>
                  <th>Application ID</th>
                  <td>{emp.regno}</td>
                  <th>Name</th>
                  <td>{emp.name}</td>
                  <th>Mobile Number</th>
                  <td>{emp.mob}</td>
                </tr>
                {response !== emp.regno && (
                  <tr className="text-center">
                    <td></td>

                    <td>
                      <AiOutlineFullscreen
                        onClick={() => expand(emp.regno)}
                        style={{
                          height: "30px",
                          width: "30px",
                        }}
                      />
                    </td>
                  </tr>
                )}

                <tr>
                  <th>Email</th>
                  <td>{emp.email}</td>

                  <th>Gender</th>
                  <td>{emp.gender}</td>
                  <th>Date Of Birth</th>

                  <td>{emp.date}</td>
                </tr>
                <br />
                <br />
                <br />
                {response === emp.regno && (
                  <>
                    <tr className="text-center">
                      <td></td>

                      <td>
                        <AiOutlineCompress
                          onClick={() => expand1(emp.mainemail)}
                          style={{
                            height: "30px",
                            width: "30px",
                          }}
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Aadhar Number</th>
                      <td>{emp.adhar}</td>

                      <th>Pan CardNumber</th>
                      <td>{emp.pan}</td>
                    </tr>

                    <tr>
                      <th> Do you have a Passport?</th>
                      <td>{emp.val1}</td>
                      <th> Passport Number</th>

                      <td>{emp.passportnumber}</td>
                      <th> Passport Status</th>
                      <td>{emp.status1}</td>
                    </tr>

                    <tr>
                      <th> Passport Expiry Date</th>
                      <td>{emp.exp1}</td>
                    </tr>

                    <tr>
                      <th> Do you have a VISA?</th>
                      <td>{emp.val2}</td>
                      <th> VisaNumber</th>

                      <td>{emp.visanumber}</td>
                      <th> VISA Type</th>
                      <td>{emp.status2}</td>
                    </tr>

                    <tr>
                      <th> VISA Expiry Date</th>
                      <td>{emp.exp2}</td>
                    </tr>
                    <tr>
                      <th> Address</th>
                      <td>{emp.adress}</td>
                      <th>City</th>
                      <td>{emp.city}</td>
                      <th>State</th>
                      <td>{emp.state}</td>
                    </tr>

                    <tr>
                      <td> Pin Code</td>
                      <td>{emp.pinnumber}</td>
                    </tr>

                    <tr>
                      <th>Edit</th>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit2(emp.regno)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    <br />
                    <br />
                    <br />
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <center>
          <a href="javascript:history.go(-1)">Go Back</a>
        </center>
      </div>
    </div>
  );
};

export default ViewProApplication;
