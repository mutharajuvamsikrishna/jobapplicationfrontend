import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Application.css";
import { postUserAddmore, getViewAddmore } from "./Services/Api";
import { CgProfile } from "react-icons/cg";
import UserPersonalEdit from "./UserPersonalEdit";
const PersonalApplication = () => {
  const location = useLocation(); // Move this line before any references to 'location'

  const [formdata, setFormdata] = useState([]);
  const email = location.state.data.email; // Now you can access 'locat
  const data = {
    email: email,
  };

  const [formData, setFormData] = useState({
    regno: "",
    name: "",
    mob: "",
    adhar: "",
    pan: "",
    val1: "",
    status1: "",
    passportnumber: "",
    exp1: "",
    val2: "",
    status2: "",
    visanumber: "",
    exp2: "",
    date: "",
    adress: "",
    city: "",
    state: "",
    pinnumber: "",
    email: email,
  });
  const [errors, setErrors] = useState({
    regno: "",
    name: "",
    mob: "",
    adhar: "",
    pan: "",
    val1: "",
    status1: "",
    passportnumber: "",
    exp1: "",
    val2: "",
    status2: "",
    visanumber: "",
    exp2: "",
    date: "",
    adress: "",
    city: "",
    state: "",
    pinnumber: "",
  });
  useEffect(() => {
    fetchEmployee(email);
  }, [email]);

  const fetchEmployee = async (email) => {
    try {
      const response = await getViewAddmore(email);
      setFormdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const [showAdditionalRows1, setShowAdditionalRows1] = useState({
    val2: "",
  });

  const [showAdditionalRows, setShowAdditionalRows] = useState({
    val1: "", // Default value for the 'Onsite Travelled' select field
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      postUserAddmore(formData)
        .then((response) => {
          if (response.data === "sucess") {
            navigate("/success", { state: { data: formData } }); // Use navigate to change the route
          } else {
            navigate("/regfail");
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
  };
  // Function to handle changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "val1") {
      setShowAdditionalRows({
        ...showAdditionalRows,
        val1: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "val2") {
      setShowAdditionalRows1({
        ...showAdditionalRows1,
        val2: value,
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
    // Implement your validation logic here
    // Return an error message if the field is not valid, otherwise return an empty string
    if (name === "gender" && value === "") {
      return "Please select Gender";
    }
    if (name === "date" && value === "") {
      return "required";
    }

    if (name === "adhar" && value === "") {
      return "Please select Aadhar Number";
    }
    if (name === "adhar") {
      const aadharRegex = /^\d{12}$/;

      if (!aadharRegex.test(value)) {
        return "Aadhar Number 12 digits";
      }
    }
    if (name === "pan" && value === "") {
      return "Please select PanCard Number";
    }
    if (name === "pan") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

      if (!panRegex.test(value)) {
        return "Invalid PAN Card Number";
      }
    }
    if (name === "val1" && value === "") {
      return "required";
    }
    if (name === "passportnumber" && value === "") {
      return "Enter Passport Number";
    }
    if (name === "passportnumber") {
      // Modify the regex according to your specific requirements
      const passportRegex = /^[A-Za-z0-9]+$/;

      if (!passportRegex.test(value)) {
        return "Invalid Passport Number";
      }
    }
    if (name === "status1" && value === "") {
      return "Select Passport Status";
    }
    if (name === "exp1" && value === "") {
      return "Select Passport Expiry Date";
    }
    //start
    if (name === "val2" && value === "") {
      return "required";
    }
    if (name === "visanumber" && value === "") {
      return "Enter VISA Number";
    }
    if (name === "visanumber") {
      // Modify the regex according to your specific requirements
      const passportRegex = /^[A-Za-z0-9]+$/;

      if (!passportRegex.test(value)) {
        return "Invalid VISA Number";
      }
    }
    if (name === "status2" && value === "") {
      return "Select VISA Status";
    }
    if (name === "exp2" && value === "") {
      return "Select VISA Expiry Date";
    }
    if (name === "val1" && value === "") {
      return "required";
    }
    if (name === "passportnumber" && value === "") {
      return "Enter Passport Number";
    }
    if (name === "passportnumber") {
      // Modify the regex according to your specific requirements
      const passportRegex = /^[A-Za-z0-9]+$/;

      if (!passportRegex.test(value)) {
        return "Invalid Passport Number";
      }
    }
    if (name === "status1" && value === "") {
      return "Select Passport Status";
    }
    if (name === "adress" && value === "") {
      return "Select Address";
    }
    if (name === "adress") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        return "Address Alphabets Only";
      }
    }
    if (name === "city" && value === "") {
      return "Select City";
    }
    if (name === "city") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        return "City Alphabets Only";
      }
    }
    if (name === "state" && value === "") {
      return "Select State";
    }
    if (name === "state") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        return "State Alphabets Only";
      }
    }
    if (name === "pinnumber" && value === "") {
      return "Select PIN Code";
    }
    if (name === "pinnumber") {
      const pinRegex = /^\d{6}$/;

      if (!pinRegex.test(value)) {
        return "PIN Code 6 digits";
      }
    }
    return "";
  };
 
if(formdata.adhar!==undefined){
return <div><UserPersonalEdit/></div>
}
const handleSubmit2 = () => {
  const data = {
    email: email,
  };
  navigate("/profile", { state: { data: data } });
};
  return (
    <div
      className=""
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
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
              Personal Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group row my-2">
                <label htmlFor="id" className="col-sm-2 col-form-label my-1">
                  Gender
                </label>
                <div className="col-sm-3 my-1">
                  <select
                    id=""
                    name="gender"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.gender}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <div className="text-danger">{errors.gender}</div>
                </div>
                <label htmlFor="Da" className="col-sm-2 col-form-label my-1">
                  Date Of Birth
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="notice"
                    autoComplete="date"
                    required
                  />
                  <div className="text-danger">{errors.date}</div>
                </div>
              </div>

              <div className="form-group row my-1">
                <label htmlFor="lwd" className="col-sm-2 col-form-label my-1">
                  Aadhar Number
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Aadhar Number"
                    name="adhar"
                    value={formData.adhar}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="lwd"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.adhar}</div>
                </div>
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  PANCard Number
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter PAN Number"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="expertise"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.pan}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                <label htmlFor="id" className="col-sm-2 col-form-label my-1">
                  Do you have a Passport?
                </label>
                <div className="col-sm-3 my-1">
                  <select
                    id="id"
                    name="val1"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.val1}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select..</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <div className="text-danger">{errors.val1}</div>
                </div>
              </div>

              {showAdditionalRows.val1 === "yes" && (
                <>
                  <div className="form-group row my-2 d-flex">
                    <label
                      htmlFor="countries"
                      className="col-sm-2 col-form-label my-1"
                    >
                      Passport Number
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        name="passportnumber"
                        placeholder="Enter Passport Number"
                        value={formData.passportnumber}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="countries"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.passportnumber}</div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> */}
                    <label
                      htmlFor="countries"
                      className="col-sm-2 col-form-label my-1"
                    >
                      Passport Status
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="text"
                        placeholder="Enter Passport Status"
                        name="status1"
                        value={formData.status1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="countries"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.status1}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    <label
                      htmlFor="cities"
                      className="col-sm-2 col-form-label my-1"
                    >
                      Passport Expiry Date
                    </label>
                    <div className="col-sm-3 my-1">
                      <input
                        type="date"
                        name="exp1"
                        value={formData.exp1}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="cities"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.exp1}</div>
                    </div>
                  </div>
               

              <div className="form-group row my-2 d-flex">
                <label htmlFor="id" className="col-sm-2 col-form-label my-1">
                  Do you have a VISA?
                </label>
                <div className="col-sm-3 my-1">
                  <select
                    id="prev"
                    name="val2"
                    style={{ color: "green", appearance: "auto" }}
                    value={formData.val2}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <div className="text-danger">{errors.val2}</div>
                </div>
              </div>

              {showAdditionalRows1.val2 === "yes" && (
                <>
                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      VisaNumber
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter VisaNumber"
                        name="visanumber"
                        value={formData.visanumber}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.visanumber}</div>
                    </div>
                    {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      VISA Type
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="text"
                        placeholder="Enter Visa Type"
                        name="status2"
                        value={formData.status2}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.status2}</div>
                    </div>
                  </div>

                  <div className="form-group row my-2 d-flex">
                    {" "}
                    {/* Add my-2 class and d-flex class here */}
                    <label
                      htmlFor="expertise"
                      className="col-sm-2 col-form-label my-1"
                    >
                      VISA Expiry Date
                    </label>{" "}
                    {/* Add my-1 class here */}
                    <div className="col-sm-3 my-1">
                      {" "}
                      {/* Add my-1 class here */}
                      <input
                        type="date"
                        name="exp2"
                        value={formData.exp2}
                        onChange={handleInputChange}
                        onFocus={handleInputChange}
                        className="form-control"
                        id="languages"
                        autoComplete=""
                        required
                      />
                      <div className="text-danger">{errors.exp2}</div>
                    </div>
                  </div>
                </>
              )}
                   </>
              )}
              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  Address
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Address"
                    name="adress"
                    value={formData.adress}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="pskills"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.adress}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  City
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="cuctc"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.city}</div>
                </div>
              </div>

              <div className="form-group row my-2 d-flex">
                {" "}
                {/* Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expctc"
                  className="col-sm-2 col-form-label my-1"
                >
                  State
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="expctc"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.state}</div>
                </div>
                {/* <div className="form-group row my-2 d-flex"> Add my-2 class and d-flex class here */}
                <label
                  htmlFor="expertise"
                  className="col-sm-2 col-form-label my-1"
                >
                  PIN Code
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  {" "}
                  {/* Add my-1 class here */}
                  <input
                    type="text"
                    placeholder="Enter Pin Code"
                    name="pinnumber"
                    value={formData.pinnumber}
                    onChange={handleInputChange}
                    onFocus={handleInputChange}
                    className="form-control"
                    id="link"
                    autoComplete=""
                    required
                  />
                  <div className="text-danger">{errors.pinnumber}</div>
                </div>
              </div>

              <div className="form-group row">
                <br />
                <div className="offset-sm-5 col-sm-10">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
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
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalApplication;
