import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file
import "./ViweAll.css";
import { CgProfile } from "react-icons/cg";
import { getProfessional } from "./Services/Api";
import { putUserEditDetailsUpdate } from "./Services/Api";
const AdminEdit = () => {
  // State variables
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const regno = location.state.data.regno;
  const navigate = useNavigate();
  const [resstate, setResstate] = useState("");
  const [resstate3, setResstate3] = useState("");
  // State object to store form field values
  const [formData, setFormData] = useState({});
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
    expy: "",
    prevCompanyName2: "",
  });
  const date1 = new Date().toJSON().slice(0, 10);
  useEffect(() => {
    fetchEmployeeData(regno);
  }, [regno]);

  const fetchEmployeeData = (regno) => {
    //axios
    // .get(`http://localhost:1279/viewprofessional?regno=${regno}`)
    getProfessional(regno)
      .then((response) => {
        // et the initial values of form fields from employeeData
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const email = formData.email;
  const data = {
    email: email,
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));

    const validateField = (name, value) => {
      if (name === "expy" && value === "") {
        return "Please Change Status";
      }
      if (name === "prevCompanyName2") {
        const minDate = new Date(); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if (enteredDate < minDate) {
          return "Invalid Date";
        }
      }
      if (name === "id" && value === "") {
        return "Please Select a job";
      }
      if (name === "sdate" && value === "") {
        return "required";
      }
      if (name === "sdate") {
        const minDate = new Date(); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if (enteredDate >= minDate) {
          return "Invalid Date";
        }
      }
      if (name === "edate" && value === "") {
        return "required";
      }
      if (name === "edate") {
        const minDate = new Date(formData.sdate); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);
        const maxDate= new Date();
        if (enteredDate <= minDate||enteredDate>=maxDate) {
          return "Invalid Date";
        }
      }
      if (name === "lwd") {
        const minDate = new Date(); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if (enteredDate >minDate) {
          return "Invalid Date";
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
      if (name === "val5" && value == "") {
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
      if (name === "id12" && value == "") {
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
      if (name === "prevFromDate" && value == "") {
        return "required";
      }
      if (name === "prevFromDate") {
        const minDate = new Date(); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if (enteredDate >= minDate) {
          return "Invalid Date";
        }
      }
      if (name === "prevToDate" && value == "") {
        return "required";
      }
      if (name === "prevToDate") {
        const maxDate=new Date();
        const minDate = new Date(formData.prevFromDate); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if ((enteredDate <= minDate)||(enteredDate>=maxDate)) {
          return "Invalid Date";
        }
      }
      if (name === "role" && value == "") {
        return "Enter Role";
      }
      if (name === "designation" && value == "") {
        return "required";
      }
      if (name === "ctc" && value == "") {
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
      if (name === "prevFromDate1" && value == "") {
        return "required";
      }
      if (name === "prevFromDate1") {
        const minDate = new Date(); // Assuming you want to compare with the current date
        const enteredDate = new Date(value);

        if (enteredDate >= minDate) {
          return "Invalid Date";
        }
      }
      if (name === "prevToDate1" && value == "") {
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
      if (name === "role1" && value == "") {
        return "Enter Role";
      }
      if (name === "designation1" && value == "") {
        return "required";
      }
      if (name === "ctc1" && value == "") {
        return "required";
      }
      return "";
    };
  };
  const confirmEdit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      if (formData.expy === "InterView" && formData.prevCompanyName2 === null) {
        alert("Please Select InterView Date");
        return false;
      }
      if (window.confirm("Are you sure you want to Edit?")) {
        handleSubmit1();
      }
    }
  };

  const handleSubmit1 = (event) => {
    setLoading(true);
    //  axios
    //  .post("http://localhost:1279/prosave", formData)

    putUserEditDetailsUpdate(formData)
      .then((response) => {
        if (response.data === "UpdateSucess") {
          alert("Details Updated SuccessFully");
          window.location.reload();
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  const handleSubmit3 = () => {
    navigate("/adminprofile", { state: { data: data } });
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-2">Loading...</h4>
      </div>
    );
  }
  return (
    <div className="pad" style={{ paddingTop: "50px" }}>
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

      <h2 className="text-center">Edit Professional Details</h2>
      <h3 className="text-center"> Your Application ID is {formData.regno}</h3>
      <div
        className="text-center"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={confirmEdit}>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Application Status</th>
                  <td>
                    <select
                      id="id"
                      name="expy"
                      style={{
                        color: "green",

                        appearance: "auto",
                      }}
                      value={formData.expy}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="">Applied</option>
                      <option value="Rejected">Rejected</option>
                      <option value="InterView">InterView</option>
                    </select>
                    <div className="text-danger">{errors.expy}</div>
                  </td>

                  <td>
                    <th>Email</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                      readOnly
                    />
                  </td>
                  <th>InterView Date</th>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="prevCompanyName2"
                      value={formData.prevCompanyName2 || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      min={date1}
                    />
                    <div className="text-danger">{errors.prevCompanyName2}</div>
                  </td>
                </tr>

                <tr>
                  <th>Job Applied For</th>
                  <td>
                  <input
                      className="form-control"
                      type="text"
                      name="id"
                      value={formData.id || ""}
                    />
                  </td>

                  <td>
                    <th>Experience From</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="sdate"
                      value={formData.sdate || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      max={date1}
                      required
                    />
                    <div className="text-danger">{errors.sdate}</div>
                  </td>
                  <td>
                    <th>To</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="edate"
                      value={formData.edate || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      min={formData.sdate}
                      max={date1}
                      required
                    />
                    <div className="text-danger">{errors.edate}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <th>Exp. in Years</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="rexpy"
                      value={formData.rexpy || ""}
                      required
                      readOnly
                    />
                  </td>
                  <td>
                    <th>Notice Period</th>
                  </td>
                  <td>
                    <select
                      name="notice"
                      style={{ appearance: "auto" }}
                      value={formData.notice}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="15">15 </option>
                      <option value="30">30 </option>
                      <option value=""> 45</option>
                      <option value="60"> 60</option>
                      <option value="75">75 </option>
                    </select>
                  </td>
                  <td>
                    <th>LWD (If Resigned)</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="lwd"
                      value={formData.lwd || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      max={date1}
                    />
                    <div className="text-danger">{errors.lwd}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Immediate Joiner</th>
                  </td>
                  <td>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td>
                    <th>Domain</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.domain}</div>
                  </td>
                  <td>
                    <th>Expertise</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="expertise"
                      value={formData.expertise || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.expertise}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Primary Skills</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="pskills"
                      value={formData.pskills || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.pskills}</div>
                  </td>
                  <td>
                    <th>Current CTC</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="cuctc"
                      value={formData.cuctc || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.cuctc}</div>
                  </td>
                  <td>
                    <th>Expected CTC </th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="expctc"
                      value={formData.expctc || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.expctc}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>LinkedIn Profile Link</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="link"
                      value={formData.link || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.link}</div>
                  </td>
                  <td>
                    <th>Current Location</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="culocation"
                      value={formData.culocation || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.culocation}</div>
                  </td>
                  <td>
                    <th>Preferd Location </th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="prelocaion"
                      value={formData.prelocaion || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.prelocaion}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Frameworks</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="frameworks"
                      value={formData.frameworks || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.frameworks}</div>
                  </td>
                  <td>
                    <th>Tools</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="tools"
                      value={formData.tools || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.tools}</div>
                  </td>
                  <td>
                    <th>Databases </th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="databases1"
                      value={formData.databases1 || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Servers</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="servers"
                      value={formData.servers || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                    />
                  </td>
                  <td>
                    <th>Cloud</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="cloud"
                      value={formData.cloud || ""}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={2}></td>
                  <td colSpan={2}>
                    <h6>Previous Company Details</h6>
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td>
                    <th>Previous Company</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="prevCompanyName"
                      value={formData.prevCompanyName || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.prevCompanyName}</div>
                  </td>
                  <td>
                    <th>Employee ID</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="id1"
                      value={formData.id1 || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.id1}</div>
                  </td>
                  <td>
                    <th>Location </th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.location}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <th>Worked Years</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="number"
                      name="workedYears"
                      value={formData.workedYears || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.workedYears}</div>
                  </td>
                  <td>
                    <th>Duration From</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="prevFromDate"
                      value={formData.prevFromDate || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      max={date1}
                      required
                    />
                    <div className="text-danger">{errors.prevFromDate}</div>
                  </td>
                  <td>
                    <th>To</th>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      type="date"
                      name="prevToDate"
                      value={formData.prevToDate || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      min={formData.prevFromDate}
                      max={date1}
                      required
                    />
                    <div className="text-danger">{errors.prevToDate}</div>
                  </td>
                </tr>
                {formData.prevCompanyName1 === "" && (
                  <>
                    <tr>
                      <td className="id2" colSpan={2}>
                        <h6 className="text-center" style={{ color: "" }}>
                          Do You Have Previous Compny-1 Details?
                        </h6>
                      </td>
                      <td className="id3">
                        Yes &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="resstate"
                          value="yes"
                          onChange={(e) => setResstate(e.target.value)}
                        />
                      </td>
                      <td className="id3">
                        No &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="resstate"
                          value="no"
                          onChange={(e) => setResstate(e.target.value)}
                        />
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </>
                )}
                {(resstate === "yes" || formData.prevCompanyName1 !== "") && (
                  <>
                   <tr>
                  <td colSpan={2}></td>
                  <td colSpan={2}>
                    <h6>Previous Company-1 Details</h6>
                  </td>
                  <td colSpan={2}></td>
                </tr>
                    <tr>
                      <td>
                        <th>Previous Company-1</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="prevCompanyName1"
                          value={formData.prevCompanyName1 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">
                          {errors.prevCompanyName1}
                        </div>
                      </td>
                      <td>
                        <th>Employee ID</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="id11"
                          value={formData.id11 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.id11}</div>
                      </td>
                      <td>
                        <th>Location </th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="location1"
                          value={formData.location1 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.location1}</div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <th>Worked Years</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="number"
                          name="workedYears1"
                          value={formData.workedYears1 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.workedYears1}</div>
                      </td>
                      <td>
                        <th>Duration From</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="date"
                          name="prevFromDate1"
                          value={formData.prevFromDate1 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          max={date1}
                          required
                        />
                        <div className="text-danger">
                          {errors.prevFromDate1}
                        </div>
                      </td>
                      <td>
                        <th>To</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="date"
                          name="prevToDate1"
                          value={formData.prevToDate1 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          min={formData.prevFromDate1}
                          max={date1
                          }
                          required
                        />
                        <div className="text-danger">{errors.prevToDate1}</div>
                      </td>
                    </tr>
                  </>
                )}
                {formData.coun === "" && (
                  <>
                    <tr>
                      <td className="id2" colSpan={2}>
                        <h6 className="text-center" style={{ color: "" }}>
                          Do You Have Onsite Travelled Details?
                        </h6>
                      </td>
                      <td className="id3">
                        Yes &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="resstate3"
                          value="yes"
                          onChange={(e) => setResstate3(e.target.value)}
                        />
                      </td>
                      <td className="id3">
                        No &nbsp;&nbsp;
                        <input
                          type="radio"
                          name="resstate3"
                          value="no"
                          onChange={(e) => setResstate3(e.target.value)}
                        />
                      </td>
                      <td colSpan={3}></td>
                    </tr>
                  </>
                )}
                {(resstate3 === "yes" || formData.coun !== "") && (
                  <>
                    <tr>
                      <td>
                        <th>On-Site Travelled Yes / No</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="val5"
                          value={formData.val5 || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                         
                        />
                        <div className="text-danger">{errors.val5}</div>
                      </td>
                      <td>
                        <th>Countries</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="coun"
                          value={formData.coun || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.coun}</div>
                      </td>
                      <td>
                        <th>Cities </th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="citi"
                          value={formData.citi || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.citi}</div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <th>On-site Company Names</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="onciti"
                          value={formData.onciti || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.onciti}</div>
                      </td>

                      <td>
                        <th>On-site Clients Supported</th>
                      </td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="onciticli"
                          value={formData.onciticli || ""}
                          onChange={handleInputChange}
                          onFocus={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.onciticli}</div>
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>
                    <th>Comments</th>
                  </td>
                  <td colSpan={5}>
                    <textarea
                      className="form-control"
                      placeholder="Add Coments"
                      name="workedYears2"
                      value={formData.workedYears2 || ""}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      style={{ resize: "vertical" }}
                      rows={1}
                      
                      maxLength={40}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <center>
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "150px" }}
              >
                Save
              </button>
            </center>
          </form>
        )}

        <br />
        <br />
        <Link to="/viewalldetails" state={{ data }}>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default AdminEdit;
