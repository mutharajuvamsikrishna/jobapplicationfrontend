import React, { useState, useEffect } from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Application.css";
import { AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { postApplicationDetails,getJobid } from "./Services/Api";
const Application = () => {
  const location = useLocation(); // Move this line before any references to 'location'
  const email = location.state.data.email; // Now you can access 'locat
  const data = {
    email: email,
  };
  const [load, setLoad] = useState(false);
  const date = new Date().toJSON().slice(0, 10);
  const[jobid,setJobid]=useState([]);
  const [formData, setFormData] = useState({
    expy: "Applied",
    id: "",
    immi: "",
    sdate: "",
    edate: "",
    notice: "",
    domain: "",
    expertise: "",
    pskills: "",
    cuctc: "",
    expctc: "",
    link: "",
    culocation: "",
    prelocaion: "",
    languages: "",
    frameworks: "",
    tools: "",
    databases1: "",
    servers: "",
    cloud: "",
    val5: "",
    coun: "",
    citi: "",
    onciti: "",
    onciticli: "",
    prevCompanyName: "",
    id1: "",
    prevEmployeeName: "",
    location: "",
    workedYears: "",
    prevFromDate: "",
    prevToDate: "",
    role: "",
    designation: "",
    ctc: "",
    prevCompanyName1: "",
    id11: "",
    prevEmployeeName1: "",
    location1: "",
    workedYears1: "",
    prevFromDate1: "",
    prevToDate1: "",
    role1: "",
    designation1: "",
    ctc1: "",
    lwd: "",
    id12: "",
    rexpy: "",
    email: email,
    prevEmployeeName2: date,
    location2:""
  });
  const [errors, setErrors] = useState({
    id: "",
    immi: "",
    sdate: "",
    edate: "",
    notice: "",
    domain: "",
    expertise: "",
    pskills: "",
    cuctc: "",
    expctc: "",
    link: "",
    culocation: "",
    prelocaion: "",
    languages: "",
    frameworks: "",
    tools: "",
    databases1: "",
    servers: "",
    cloud: "",
    val5: "",
    coun: "",
    citi: "",
    onciti: "",
    onciticli: "",
    prevCompanyName: "",
    id1: "",
    prevEmployeeName: "",
    location: "",
    workedYears: "",
    prevFromDate: "",
    prevToDate: "",
    role: "",
    designation: "",
    ctc: "",
    prevCompanyName1: "",
    id11: "",
    prevEmployeeName1: "",
    location1: "",
    workedYears1: "",
    prevFromDate1: "",
    prevToDate1: "",
    role1: "",
    designation1: "",
    ctc1: "",
    lwd: "",
    id12: "",
   
  });
  useEffect(() => {
    fetchJobId();
  }, []);
  const fetchJobId=()=>{
    getJobid()
    .then((response) => {
     setJobid(response.data)
    
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    // Function to calculate the experience in years
    function calculateExperience() {
      const startDate = new Date(formData.sdate);
      const endDate = new Date(formData.edate);

      if (!isNaN(startDate) && !isNaN(endDate)) {
        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Approximate milliseconds in a year
        const experienceInYears = (endDate - startDate) / millisecondsPerYear;

        setFormData({
          ...formData,
          rexpy: experienceInYears.toFixed(1),
        });
      }
    }

    calculateExperience(); // Initial calculation

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      const sdateInput = document.getElementById("sdate");
      const edateInput = document.getElementById("edate");

      // Check if the elements are not null before removing the event listeners
      if (sdateInput) {
        sdateInput.removeEventListener("input", calculateExperience);
      }
      if (edateInput) {
        edateInput.removeEventListener("input", calculateExperience);
      }
    };
  }, [formData.sdate, formData.edate]); // Trigger the effect whenever sdate or edate changes

  const navigate = useNavigate();

  const [showAdditionalRows1, setShowAdditionalRows1] = useState({
    id12: "",
  });

  const [showAdditionalRows, setShowAdditionalRows] = useState({
    val5: "", // Default value for the 'Onsite Travelled' select field
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      setLoad(true);

      postApplicationDetails(formData)
        .then((response) => {
          if (response.data === "SaveSucess") {
            navigate("/success", { state: { data: formData } }); // Use navigate to change the route
          } else {
            navigate("/regfail");
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    } else {
      console.log("Form has validation errors");
    }
  };

  // Function to handle changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "val5") {
      setShowAdditionalRows({
        ...showAdditionalRows,
        val5: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "id12") {
      setShowAdditionalRows1({
        ...showAdditionalRows1,
        id12: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };
  const validateField = (name, value) => {
    if (name === "id" && value === "") {
      return "Please Select a job";
    }
    if (name === "sdate" && value=="") {
      return "required";
    }
    if (name === "sdate") {
      const minDate = new Date(); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      if (enteredDate >=minDate) {
        return "Select date below " + minDate.toJSON().slice(0, 10);
      }
    }
    if (name === "edate" && value=="") {
      return "required";
    }
    if (name === "edate") {
      const minDate = new Date(formData.sdate); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      const maxDate = new Date();

        if ((enteredDate <= minDate)||(enteredDate>=maxDate)) {
          return "Invalid Date";
        }
    }
    if (name === "lwd") {
      const minDate = new Date(); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      if (enteredDate > minDate) {
        return "Select date below " + minDate.toJSON().slice(0, 10);
      }
    }
    if (name === "notice" && value === "") {
      return "Please Select Notice Period";
    }
    if (name === "immi" && value === "") {
      return "Please Select Immidiate Joine";
    }
    if (name === "domain" && value.length < 2) {
      return "Please Select Domain";
    }
    if (name === "expertise" && value.length < 2) {
      return "Please Select Expertise";
    }
    if (name === "pskills" && value.length < 2) {
      return "Please Select Primary Skills";
    }
    if (name === "cuctc" && value.length < 2) {
      return "Please Select Current CTC";
    }
    if (name === "expctc" && value.length < 2) {
      return "Please Select Expected CTC";
    }
    if (name === "link" && value.length < 2) {
      return "Please Select LinkedIn";
    }
    if (name === "culocation" && value.length < 2) {
      return "Select Current Location";
    }
    if (name === "prelocaion" && value.length < 2) {
      return "Select Prefered Location";
    }
    if (name === "languages" && value.length < 2) {
      return "Select Prog Languages";
    }
    if (name === "frameworks" && value.length < 2) {
      return "Please Select FrameWorks";
    }
    if (name === "tools" && value.length < 2) {
      return "Please Select Tools";
    }
    if (name === "val5" && value=="") {
      return "required";
    }
    if (name === "coun" && value.length < 2) {
      return "Please Select Country";
    }
    if (name === "coun") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        return "Country Alphabets Only";
      }
    }
    if (name === "citi" && value.length < 2) {
      return "Please Select Cities";
    }
    if (name === "citi") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        return "Citi Alphabets Only";
      }
    }
    if (name === "onciti" && value.length < 2) {
      return "Select On-Site Company Names";
    }
    if (name === "onciticli" && value.length < 2) {
      return "required";
    }
    if (name === "id12" && value=="") {
      return "required";
    }
    if (name === "prevCompanyName" && value.length < 2) {
      return "required";
    }
    if (name === "id1" && value.length < 2) {
      return "required";
    }
    if (name === "location" && value.length < 2) {
      return "required";
    }
    if (name === "workedYears" && value.length < 1) {
      return "required";
    }
    if (name === "prevFromDate" && value =="") {
      return "required";
    }
     if (name === "prevFromDate") {
      const minDate = new Date(); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      if (enteredDate >= minDate) {
        return "Select date below " + minDate.toJSON().slice(0, 10);
      }
    }
    if (name === "prevToDate" && value =="") {
      return "required";
    }
    if (name === "prevToDate") {
      const minDate = new Date(formData.prevFromDate); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      const maxDate = new Date();

        if ((enteredDate <= minDate)||(enteredDate>=maxDate)) {
          return "Invalid Date";
        }
    }
    if (name === "role" && value=="") {
      return "Enter Role";
    }
    if (name === "designation" && value=="") {
      return "required";
    }
    if (name === "ctc" && value=="") {
      return "required";
    }
    // start
    if (name === "prevCompanyName1" && value.length < 2) {
      return "required";
    }
    if (name === "id11" && value.length < 2) {
      return "required";
    }
    if (name === "location1" && value.length < 2) {
      return "required";
    }
    if (name === "workedYears1" && value.length < 1) {
      return "required";
    }
    if (name === "prevFromDate1" && value =="") {
      return "required";
    }
     if (name === "prevFromDate1") {
      const minDate = new Date(); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);

      if (enteredDate >= minDate) {
        return "Select date below " + minDate.toJSON().slice(0, 10);
      }
    }
    if (name === "prevToDate1" && value =="") {
      return "required";
    }
    if (name === "prevToDate1") {
      const minDate = new Date(formData.prevFromDate1); // Assuming you want to compare with the current date
      const enteredDate = new Date(value);
      const maxDate = new Date();

      if ((enteredDate <= minDate)||(enteredDate>=maxDate)) {
        return "Invalid Date";
      }
    }
    if (name === "role1" && value=="") {
      return "Enter Role";
    }
    if (name === "designation1" && value=="") {
      return "required";
    }
    if (name === "ctc1" && value=="") {
      return "required";
    }
    let updatedFormData = { ...formData, [name]: value };
    if (name === "val5" && value === "no") {
      // Reset dependent fields to empty string
    updatedFormData = {
        ...updatedFormData,
        coun: "",
        citi: "",
        onciti: "",
        onciticli: ""
      };
      setFormData(updatedFormData);
    }
    if (name === "id12" && value === "no") {
      // Reset dependent fields to empty string
    updatedFormData = {
        ...updatedFormData,
        prevCompanyName1: "",
        id11: "",
        location1: "",
        workedYears1: "",
        prevFromDate1:"",
        prevToDate1:"",
      };
      setFormData(updatedFormData);
    }
    return "";
  };
 
  const handleSubmit2 = () => {
    const data = {
      email: email,
    };
    navigate("/profile", { state: { data: data } });
  };
  if (load) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h4 className="me-2">Sending Details By Email</h4>
        <div className="spinner-grow text-primary " role="status">
  <span className="sr-only"></span>
</div>
<div className="spinner-grow text-secondary ms-2" role="status">
  <span className="sr-only"></span>
</div>
      </div>
      
    );
  }
 
  return (
    <div className="jobappli">
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => handleSubmit2("profile")}
      >
        <CgProfile
          style={{
            height: "50px",
            width: "50px",
            color: "blue",
          }}
        />
      </div>
      <div className="application">
        <div className="row justify">
          <div className="col-md-10 mt-5">
            <h2 className="text-center mb-4" style={{ color: "blue" }}>
              ONiE Soft Job Application
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group row my-2">
                <label htmlFor="id" className="col-sm-3 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> Job Applied For
                </label>
                <div className="col-sm-3 my-1">
                  <select
                   
                    name="id"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.id}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select </option>
          {jobid.map((job, index) => (
            <option key={index} value={job.jobid}>
              {job.jobid}
            </option>
          ))}
                  </select>
                  <div className="text-danger">{errors.id}</div>
                </div>
                {/* <div className="form-group row my-1"> */}
                <label htmlFor="email" className="col-sm-2 col-form-label my-1">
                  Email <AiOutlineMail />
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                   
                    autoComplete="email"
                    readOnly
                    required
                  />
                </div>
              </div>

              <div className="form-group row my-1">
                {" "}
                {/* Add my-2 class here */}
                <label htmlFor="immi" className="col-sm-3 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> Experience From
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="sdate"
                    value={formData.sdate}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                  
                    autoComplete="date"
                    max={date}
                    required
                  />
                  <div className="text-danger">{errors.sdate}</div>
                </div>
                {/* <div className="form-group row my-1"> Add my-2 class here */}
                <label htmlFor="edate" className="col-sm-2 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> To
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="edate"
                    value={formData.edate}
                    onChange={handleInputChange}
                   
                    className="form-control"
                  
                    autoComplete="date"
                    min={formData.sdate}
                    max={date}
                    required
                  />
                  <div className="text-danger">{errors.edate}</div>
                </div>
              </div>

              <div className="form-group row my-1">
                {" "}
                {/* Add my-2 class here */}
                <label htmlFor="rexpy" className="col-sm-3 col-form-label my-1">
                   Exp. in Years
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="rexpy"
                    value={formData.rexpy}
                    className="form-control"
                  
                    autoComplete=""
                    readOnly
                  />
                </div>
                {/* <div className="form-group row my-1"> Add my-2 class here */}
                <label
                  htmlFor="notice"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Notice Period
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <select
                 
                    name="notice"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.notice}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select </option>
                    <option value="15">15 </option>
                    <option value="30">30 </option>
                    <option value="45"> 45</option>
                    <option value="60"> 60</option>
                    <option value="75">75 </option>
                  </select>
                  <div className="text-danger">{errors.notice}</div>
                </div>
              </div>

              <div className="form-group row my-1">
                {" "}
                {/* Add my-2 class here */}
                <label htmlFor="lwd" className="col-sm-3 col-form-label my-1">
                  LWD (If Resigned)
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="lwd"
                    value={formData.lwd}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    
                    autoComplete=""
                    max={date}
                  />
                  <div className="text-danger">{errors.lwd}</div>
                </div>
                {/* <div className="form-group row my-2"> */}
                <label htmlFor="immi" className="col-sm-2 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> Immidiate Joiner
                </label>
                <div className="col-sm-3 my-1">
                  <select
                    id="immi"
                    name="immi"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.immi}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <div className="text-danger">{errors.immi}</div>
                </div>
              </div>

              <div className="form-group row my-1">
                {" "}
                {/* Add my-2 class here */}
                <label
                  htmlFor="domain"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Domain
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    placeholder="Enter Domain"
                    id="domain"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.domain}</div>
                </div>
                {/* <div className="form-group row my-1"> Add my-2 class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Expertise In
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    placeholder="Enter Expertise In"
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    
                    required
                  />
                  <div className="text-danger">{errors.expertise}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Primarry Skills
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="pskills"
                    value={formData.pskills}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="pskills"
                    placeholder="Enter Primary Skills"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.pskills}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Current CTC
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="cuctc"
                    value={formData.cuctc}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="cuctc"
                    placeholder="Enter Current CTC"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.cuctc}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expctc"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Expected CTC
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="expctc"
                    value={formData.expctc}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="expctc"
                    autoComplete=""
                    placeholder="Enter Expected CTC"
                    required
                  />
                  <div className="text-danger">{errors.expctc}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>LinkedIn Profile Link{" "}
                  <AiOutlineLinkedin />
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="link"
                    placeholder="Enter LinkedIn Profile Link"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.link}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Current Location
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="culocation"
                    value={formData.culocation}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="culocation"
                    placeholder="Enter Current Location"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.culocation}</div>
                </div>
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Prefed Location
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="prelocaion"
                    value={formData.prelocaion}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="prelocation"
                    placeholder="Enter Prefed Location"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.prelocaion}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Prog. Languages
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Prog. Languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.languages}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>FrameWorks
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="frameworks"
                    placeholder="Enter FrameWorks"
                    value={formData.frameworks}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="frameworks"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.frameworks}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Tools
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="tools"
                    placeholder="Enter tools"
                    value={formData.tools}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.tools}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  Databases{" "}
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="databases1"
                    value={formData.databases1}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    placeholder="Enter Databases"
                    className="form-control"
                    id="languages"
                    autoComplete=""
                  />
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  Servers
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="servers"
                    placeholder="Servers"
                    value={formData.servers}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                  />
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  Cloud Services
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Cloud Services"
                    name="cloud"
                    value={formData.cloud}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                  />
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                <label htmlFor="id" className="col-sm-3 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> Onsite Travelled
                </label>
                <div className="col-sm-3 my-1">
                  <select
                   
                    name="val5"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.val5}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select..</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                  <div className="text-danger">{errors.val5}</div>
                </div>
              </div>

              {showAdditionalRows.val5 === "yes" && (
                <>
                  <div className="form-group row my-2 d-flex">
                    <label
                      htmlFor="countries"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> Countries:
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        placeholder="Enter Countries"
                        name="coun"
                        value={formData.coun}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="countries"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.coun}</div>
                    </div>

                    {/* <div className="form-group row my-2 d-flex"> */}
                    <label
                      htmlFor="cities"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span>Cities:
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        name="citi"
                        placeholder="Enter Cities"
                        value={formData.citi}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="cities"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.citi}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    <label
                      htmlFor="onSiteCompanyNames"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> On-Site Company
                      Names:
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        placeholder="Enter Company Names"
                        name="onciti"
                        value={formData.onciti}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="onSiteCompanyNames"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.onciti}</div>
                    </div>

                    {/* <div className="form-group row my-2 d-flex"> */}
                    <label
                      htmlFor="onSiteClientsSupported"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span>On-Site Clients
                      Supported:
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        placeholder="Enter Clients Supported"
                        name="onciticli"
                        value={formData.onciticli}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="onSiteClientsSupported"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.onciticli}</div>
                    </div>
                  </div>
                </>
              )}
              <h3>Previous Company Details</h3>
              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Previous CompanyName
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Prev CompanyName"
                    name="prevCompanyName"
                    value={formData.prevCompanyName}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.prevCompanyName}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Prev Company ID
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Prev Company ID "
                    name="id1"
                    value={formData.id1}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.id1}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>Prev Company Location
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Prev Company Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />{" "}
                  <div className="text-danger">{errors.location}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> No.of Years Worked
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="number"
                    placeholder="Enter  No.of Years Worked"
                    name="workedYears"
                    value={formData.workedYears}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.workedYears}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Duration From
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="prevFromDate"
                    value={formData.prevFromDate}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    max={date}
                    required
                  />
                  <div className="text-danger">{errors.prevFromDate}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span>To
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="prevToDate"
                    value={formData.prevToDate}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    min={formData.prevFromDate}
                    max={date}
                    required
                  />
                  <div className="text-danger">{errors.prevToDate}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Role
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    name="role"
                    placeholder="Enter Role"
                    value={formData.role}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.role}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  <span style={{ color: "red" }}>*</span> Designation
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.designation}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex ">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-3 col-form-label my-1"
                >
                 <span style={{ color: "red" }}>*</span> CTC (INR LPA)
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter CTC"
                    name="ctc"
                    value={formData.ctc}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="languages"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.ctc}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                <label htmlFor="id" className="col-sm-3 col-form-label my-1">
                  <span style={{ color: "red" }}>*</span> Previous Compny-1
                  Details
                </label>
                <div className="col-sm-3 my-1">
                  <select
                    id="prev"
                    name="id12"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.id12}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select..</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                  <div className="text-danger">{errors.id12}</div>
                </div>
              </div>

              {showAdditionalRows1.id12 === "yes" && (
                <>
                  <h3>Previous Company-1 Details</h3>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> Previous
                      CompanyName
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter Prev CompanyName"
                        name="prevCompanyName1"
                        value={formData.prevCompanyName1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">
                        {errors.prevCompanyName1}
                      </div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span>Prev Company ID
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter Prev Company ID"
                        name="id11"
                        value={formData.id11}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.id11}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> Prev Company
                      Location
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Prev Company Location"
                        name="location1"
                        value={formData.location1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.location1}</div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span>No.of Years Worked
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="number"
                        placeholder=" No.of Years Worked"
                        name="workedYears1"
                        value={formData.workedYears1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.workedYears1}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> Duration From
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="date"
                        name="prevFromDate1"
                        value={formData.prevFromDate1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        max={date}
                        required
                      />
                      <div className="text-danger">{errors.prevFromDate1}</div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> To
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="date"
                        name="prevToDate1"
                        value={formData.prevToDate1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        min={formData.prevFromDate1}
                        max={date}
                        required
                      />
                      <div className="text-danger">{errors.prevToDate1}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span>Role
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter Role"
                        name="role1"
                        value={formData.role1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.role1}</div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> Designation
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter Designation"
                        name="designation1"
                        value={formData.designation1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.designation1}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      <span style={{ color: "red" }}>*</span> CTC (INR LPA)
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter CTC"
                        name="ctc1"
                        value={formData.ctc1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.ctc1}</div>
                    </div>
                  </div>
                  </>
              )}

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-3 col-form-label my-1"
                    >
                      Add Coments
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-9 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <textarea
                        placeholder="Enter Comments"
                        name="location2"
                        value={formData.location2}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="1" // You can adjust this initial number of rows
                      style={{ resize: "vertical" }} // This allows vertical resizing
                        id="languages"
                        autoComplete=""
                       
                        maxLength={40}
                      />
                      </div>
                    </div>
    
              <div className="text-center">
                <br />
                <div className="offset-sm-3 col-sm-6">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "200px" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <br />
            <div className="text-center">
              <Link
                to="/loginsucess"
                state={{ data: data }}
                style={{ color: "bluegit" }}
              >
                Go Back
              </Link>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
