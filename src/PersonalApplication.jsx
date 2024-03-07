import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link,} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Application.css";
import { postUserAddmore, getViewAddmore } from "./Services/Api";
import { CgProfile } from "react-icons/cg";
import UserPersonalEdit from "./UserPersonalEdit";
import UserPersonalView from "./UserPersonalView";
const PersonalApplication = () => {
  const location = useLocation(); // Move this line before any references to 'location'
  const [formdata, setFormdata] = useState([]);
  const [adharfile, setAdharfile] = useState(null);
  const [panfile,setPanfile]=useState(null);
  const [passportfile,setPassportfile]=useState(null);
  const [visfile,setVisafile]=useState(null);
  const [otherFile,setOtherfile]=useState(null);

  const [adharFileSizeError, setAdharFileSizeError] = useState("");
  const [panFileSizeError, setPanFileSizeError] = useState("");
  const [passportFileSizeError, setPassportFileSizeError] = useState("");
  const [visaFileSizeError, setVisaFileSizeError] = useState("");
  const [otherFileSizeError, setOtherFileSizeError] = useState("");
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
    aadharFile:null,
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
    if (
      adharFileSizeError ||
      panFileSizeError ||
      passportFileSizeError ||
      visaFileSizeError
    ) {
      console.log("File size error. Form not submitted.");
      return;
    }
    if (!Object.values(errors).some((error) => error !== "")) {
      const data1 = new FormData();
    data1.append('aadharFile',adharfile);
    data1.append('panFile',panfile)
    data1.append("passportFile",passportfile)
data1.append("visaFile",visfile)
data1.append("otherFile",otherFile)
    data1.append("email",formData.email)
    data1.append("aadhar",formData.adhar)
    data1.append("pan",formData.pan)
    data1.append("val1",formData.val1)
    data1.append("status1",formData.status1)
    data1.append("passportnumber",formData.passportnumber)
    data1.append("exp1",formData.exp1)
    data1.append("val2",formData.val2)
    data1.append("status2",formData.status2)
    data1.append("visanumber",formData.visanumber)
    data1.append("exp2",formData.exp2)
    data1.append("gender",formData.gender)
    data1.append("date",formData.date)
    data1.append("address",formData.adress)
    data1.append("city",formData.city)
    data1.append("state",formData.state)
    data1.append("pinnumber",formData.pinnumber)
      postUserAddmore(data1)
        .then((response) => {
          if (response.status=200) {
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
  const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
  
    switch (name) {
      case "aadharFile":
        setAdharfile(file);
        
        if (file && !allowedFileTypes.includes(file.type)) {
          setAdharFileSizeError('Please choose a PNG, JPG, or JPEG file.');
          return;
        }
      
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setAdharFileSizeError("File size should be between 20KB and 50KB.");
        } else {
          setAdharFileSizeError("");
        }
        break;
      case "panFile":
        setPanfile(file);
        if (file && !allowedFileTypes.includes(file.type)) {
          setPanFileSizeError('Please choose a PNG, JPG, or JPEG file.');
          return
        }
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setPanFileSizeError("File size should be between 20KB and 50KB..");
        } else {
          setPanFileSizeError("");
        }
        break;
      case "passportFile":
        setPassportfile(file);
        if (file && !allowedFileTypes.includes(file.type)) {
          setPassportFileSizeError('Please choose a PNG, JPG, or JPEG file.');
          return;
        }
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setPassportFileSizeError("File size should be between 20KB and 50KB..");
        } else {
          setPassportFileSizeError("");
        }
        break;
      case "visaFile":
        setVisafile(file);
        if (file && !allowedFileTypes.includes(file.type)) {
          setVisaFileSizeError('Please choose a PNG, JPG, or JPEG file.');
          return;
        }
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setVisaFileSizeError("File size should be between 20KB and 50KB..");
        } else {
          setVisaFileSizeError("");
        }
        break;
        case "otherFile":
          setOtherfile(file);
          if (file && file.type !== "application/pdf") {
            setOtherFileSizeError('Please choose a PDF file.');
            return;
          }
          if (file && (file.size / 1024 < 20 || file.size / 1024 > 100)) {
            setOtherFileSizeError("File size should be between 20KB and 100KB.");
          } else {
            setOtherFileSizeError("");
          }
          break;
        
      // Add more cases for other file inputs
      default:
        break;
    }
  };
  
if(formdata.adhar!==undefined){
return <div><UserPersonalView/></div>
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
                    className="form-control" required
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
                    className="form-control" required
                    id="notice"
                    autoComplete="date"
                    
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
                    className="form-control" required
                    id="lwd"
                    autoComplete=""
                    
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
                    className="form-control" required
                    id="expertise"
                    autoComplete=""
                    
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
                    className="form-control" required
                    
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
                        className="form-control" required
                        id="countries"
                        autoComplete=""
                        
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
                        className="form-control" required
                        id="countries"
                        autoComplete=""
                        
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
                        className="form-control" required
                        id="cities"
                        autoComplete=""
                        
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
                    className="form-control" required
                    
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
                        className="form-control" required
                        id="languages"
                        autoComplete=""
                        
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
                        className="form-control" required
                        id="languages"
                        autoComplete=""
                        
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
                        className="form-control" required
                        id="languages"
                        autoComplete=""
                        
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
                    className="form-control" required
                    id="pskills"
                    autoComplete=""
                    
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
                    className="form-control" required
                    id="cuctc"
                    autoComplete=""
                    
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
                    className="form-control" required
                    id="expctc"
                    autoComplete=""
                    
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
                    className="form-control" required
                    id="link"
                    autoComplete=""
                    
                  />
                  <div className="text-danger">{errors.pinnumber}</div>
                </div>
              </div>
              <div className="form-group row my-1">
              <h5 className="text-center mb-4">
             Upload Files
            </h5>

            <label htmlFor="lwd" className="col-sm-2 col-form-label my-1">
  Aadhar File 
</label>{" "}
<div className="col-sm-3 my-1">
  <input
    type="file"
    name="aadharFile"
    onChange={handleFileChange}
    className="form-control" 
    required
  />
  {adharFileSizeError && <div className="text-danger">{adharFileSizeError}</div>}
</div>

                <label htmlFor="lwd" className="col-sm-2 col-form-label my-1">
                  PAN File
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  <input
                    type="file"
                    name="panFile"
                    onChange={handleFileChange}
                    className="form-control" 
                    required
                  />
                   {panFileSizeError && <div className="text-danger">{panFileSizeError}</div>}
                </div>
                  </div>
                  <div className="form-group row">
                  <label htmlFor="lwd" className="col-sm-2 col-form-label my-1">
                 Resume
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  <input
                    type="file"
                    name="otherFile"
                    onChange={handleFileChange}
                    className="form-control" 
                    required
                  />
                   {otherFileSizeError && <div className="text-danger">{otherFileSizeError}</div>}
                </div>
                {/* </div> */}
                  {/* <div className="form-group row my-1"> */}
                  <label htmlFor="lwd" className="col-sm-2 col-form-label my-1">
                (optional)  Passport File
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  <input
                    type="file"
                    name="passportFile"
                    onChange={handleFileChange}
                    className="form-control" 
                  />
                   {passportFileSizeError && <div className="text-danger">{passportFileSizeError}</div>}
                </div>
                <div className="form-group row my-1">
                <label htmlFor="lwd" className="col-sm-3 col-form-label my-1">
                 (Optional) VISA File Upload
                </label>{" "}
                {/* Add my-1 class here */}
                <div className="col-sm-3 my-1">
                  <input
                    type="file"
                    name="visaFile"
                    onChange={handleFileChange}
                    className="form-control" 
                  />
                   {visaFileSizeError && <div className="text-danger">{visaFileSizeError}</div>}
                   </div>
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
