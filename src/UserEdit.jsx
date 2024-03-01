import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file
import "./ViweAll.css";
import { CgProfile } from 'react-icons/cg';
const AdminEdit = () => {
  // State variables
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const regno = location.state.data.regno;
  const navigate = useNavigate();

  // State object to store form field values
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEmployeeData(regno);
  }, [regno]);

  const fetchEmployeeData = (regno) => {
    axios
      .get(`http://localhost:1279/viewprofessional?regno=${regno}`)
      .then((response) => {
       
        // Filter out keys with null values or empty strings
        const filteredData = Object.fromEntries(
          Object.entries(response.data).filter(
            ([_, value]) => value !== null && value !== ""
          )
        );

        setEmployeeData(filteredData);
        setLoading(false);

        // Set the initial values of form fields from employeeData
        setFormData(filteredData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const email=formData.email;
const data={
  email:email
}
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const confirmEdit = () => {
    if (window.confirm("Are you sure you want to Edit?")) {
      handleSubmit1();
    }
  };
  const handleSubmit1 = (event) => {
   
    axios
      .post("http://localhost:1279/prosave", formData)
      .then((response) => {
        if (response.data === "personaldetails") {
          alert("Details Updated SuccessFully");
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
const handleSubmit2=()=>{
navigate("/viewpersonal", {state:{data:data}} )
}
const handleSubmit3=()=>{
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
      onClick={handleSubmit3}
    >
      <CgProfile
        style={{
          height: "50px",
          width: "50px",
          color:"blue"
        }} />
    </div>
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-center">Edit Professional Details</h2>
<h3 className="text-center"> Your Application ID is {formData.regno}</h3>
      <div className="text-center">
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form  onSubmit={(event) => event.preventDefault()}>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Application Status</th>
                  <td>
                  <input
                      type="text"
                      name="expy"
                      value={formData.expy || ""}
                      onChange={handleInputChange} 
                      style={{color:"green"}}
                      readOnly
                    />
                  </td>

                  <td>
                    <th>Email</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange} required
                      readOnly
                    />
                  </td>
                </tr>

                <tr>
                  <th>Job Applied For</th>
                  <td>
                    <input type="text"
                      id="id"
                      name="id"
                     
                      value={formData.id}
                      onChange={handleInputChange} required
                      readOnly
                    
                    />
                  </td>

                  <td>
                    <th>Duration From</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="sdate"
                      value={formData.sdate || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>To</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="edate"
                      value={formData.edate || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <th>Relevant IT/SW Experience In Years</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="rexpy"
                      value={formData.rexpy || ""}
                      onChange={handleInputChange} required
                      readOnly
                    />
                  </td>
                  <td>
                    <th>Notice Period</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="notice"
                      value={formData.notice || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>LWD (If Resigned)</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lwd"
                      value={formData.lwd || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Immediate Joiner</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="immi"
                      value={formData.immi || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Domain</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="domain"
                      value={formData.domain || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Expertise</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Primary Skills</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pskills"
                      value={formData.pskills || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Current CTC</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cuctc"
                      value={formData.cuctc || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Expected CTC </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="expctc"
                      value={formData.expctc || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>LinkedIn Profile Link</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="link"
                      value={formData.link || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Current Location</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="culocation"
                      value={formData.culocation || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Preferd Location </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prelocaion"
                      value={formData.prelocaion || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Frameworks</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="frameworks"
                      value={formData.frameworks || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Tools</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="tools"
                      value={formData.tools || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Databases </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="databases1"
                      value={formData.databases1 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Servers</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="servers"
                      value={formData.servers || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Cloud</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="cloud"
                      value={formData.cloud || ""}
                    />
                  </td>
                  <td>
                    <th>Preferd Location </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prelocaion"
                      value={formData.prelocaion || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <h6>On-Site Details</h6>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>On-Site Travelled Yes / No</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="val5"
                      value={formData.val5 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Countries</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="coun"
                      value={formData.coun || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Cities </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="citi"
                      value={formData.citi || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>On-site Company Names</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="onciti"
                      value={formData.onciti || ""}
                      onChange={handleInputChange} 
                    />
                  </td>

                  <td>
                    <th>On-site Clients Supported</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="onciticli"
                      value={formData.onciti || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <h6>Previous Company-1 Details</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <th>Previous Company-1</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevCompanyName"
                      value={formData.prevCompanyName || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Employee ID</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="id1"
                      value={formData.id1 || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Location </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Worked Years</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="workedYears"
                      value={formData.workedYears || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>Duration From</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevFromDate"
                      value={formData.prevFromDate || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                  <td>
                    <th>To</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevToDate"
                      value={formData.prevToDate || ""}
                      onChange={handleInputChange} required
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <h6>Previous Company-2 Details</h6>
                  </td>
                </tr>
                <tr>
                  <td>
                    <th>Previous Company-2</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevCompanyName1"
                      value={formData.prevCompanyName1 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Employee ID</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="id11"
                      value={formData.id11 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Location </th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="location1"
                      value={formData.location1 || ""}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Worked Years</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="workedYears1"
                      value={formData.workedYears1 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>Duration From</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevFromDate1"
                      value={formData.prevFromDate1 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                  <td>
                    <th>To</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="prevToDate1"
                      value={formData.prevToDate1 || ""}
                      onChange={handleInputChange} 
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br/>
            <center>
            <br/>
            <button type="button" className="btn btn-primary" onClick={confirmEdit}>
    Save
  </button>
            </center>
          </form>
        )}
        <br />
        <br />
       
        <button className="btn btn-primary" onClick={handleSubmit2}>
         View Personal Details
        </button>
        
        <br /><br />
        <Link to="/viewapplication" state={{data}}>Go Back</Link>
      </div>
    </div>
  );<br/>
};

export default AdminEdit;
