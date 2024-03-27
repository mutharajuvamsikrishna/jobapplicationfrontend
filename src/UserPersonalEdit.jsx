import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file
import { CgProfile } from "react-icons/cg";
import { getViewAddmore } from "./Services/Api";
import { putUserAddmore } from "./Services/Api";
const UserPersonalEdit = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [adharfile, setAdharfile] = useState(null);
  const [panfile, setPanfile] = useState(null);
  const [passportfile, setPassportfile] = useState(null);
  const [visfile, setVisafile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [adharFileSizeError, setAdharFileSizeError] = useState("");
  const [panFileSizeError, setPanFileSizeError] = useState("");
  const [passportFileSizeError, setPassportFileSizeError] = useState("");
  const [visaFileSizeError, setVisaFileSizeError] = useState("");
  const [otherFileSizeError, setOtherFileSizeError] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const email = location.state.data.email;
  const data = {
    email: email,
  };
  const navigate = useNavigate();

  // State object to store form field values
  const [formData, setFormData] = useState({});
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
    fetchEmployeeData(email);
    fetchStates();
}, [email]);

useEffect(() => {
    if (stateList.length > 0 && formData.state) {
        fetchCities();
    }
}, [stateList, formData.state]);

const fetchStates = () => {
    setStateList(State.getStatesOfCountry("IN"));
};

const fetchCities = () => {
    const findState = stateList.find((sta) => sta.name === formData.state);
    if (findState) {
        const stateCode = findState.isoCode;
        setStateCode(stateCode);
        setCityList(City.getCitiesOfState("IN", stateCode));
    }
};

  const fetchEmployeeData = (email) => {
    //axios
    //  .get(`http://localhost:1279/viewpersonal?email=${regno}`)
    getViewAddmore(email)
      .then((response) => {
        setLoading(false);

        // Set the initial values of form fields from employeeData
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // Function to fetch Indian districts based on the selected state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];

    switch (name) {
      case "aadharFile":
        setAdharfile(file);

        if (file && !allowedFileTypes.includes(file.type)) {
          setAdharFileSizeError("Please choose a PNG, JPG, or JPEG file.");
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
          setPanFileSizeError("Please choose a PNG, JPG, or JPEG file.");
          return;
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
          setPassportFileSizeError("Please choose a PNG, JPG, or JPEG file.");
          return;
        }
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setPassportFileSizeError(
            "File size should be between 20KB and 50KB.."
          );
        } else {
          setPassportFileSizeError("");
        }
        break;
      case "visaFile":
        setVisafile(file);
        if (file && !allowedFileTypes.includes(file.type)) {
          setVisaFileSizeError("Please choose a PNG, JPG, or JPEG file.");
          return;
        }
        if (file && (file.size / 1024 < 20 || file.size / 1024 > 50)) {
          setVisaFileSizeError("File size should be between 20KB and 50KB..");
        } else {
          setVisaFileSizeError("");
        }
        break;
      case "otherFile":
        setOtherFile(file);
        if (file && file.type !== "application/pdf") {
          setOtherFileSizeError("Please choose a PDF file.");
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

  const confirmEdit = (event) => {
    event.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      if (window.confirm("Are you sure you want to Edit?")) {
        handleSubmit1();
      }
    }
  };
  const handleSubmit1 = () => {
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
      data1.append("aadharFile", adharfile);
      data1.append("panFile", panfile);
      data1.append("passportFile", passportfile);
      data1.append("visaFile", visfile);
      data1.append("otherFile", otherFile);
      data1.append("email", formData.email);
      data1.append("aadhar", formData.adhar);
      data1.append("pan", formData.pan);
      data1.append("val1", formData.val1);
      data1.append("status1", formData.status1);
      data1.append("passportnumber", formData.passportnumber);
      data1.append("exp1", formData.exp1);
      data1.append("val2", formData.val2);
      data1.append("status2", formData.status2);
      data1.append("visanumber", formData.visanumber);
      data1.append("exp2", formData.exp2);
      data1.append("gender", formData.gender);
      data1.append("date", formData.date);
      data1.append("address", formData.adress);
      data1.append("city", formData.city);
      data1.append("state", formData.state);
      data1.append("pinnumber", formData.pinnumber);
      putUserAddmore(data1)
        .then((response) => {
          if ((response.status = 200)) {
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

  const handleSubmit2 = () => {
    navigate("/profile", { state: { data: data } });
  };

  return (
    <div className="pad">
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
            color: "blue",
          }}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-center">Edit Personal Details</h2>
      <h3 className="text-center">Your Application ID is {formData.regno} </h3>
      <div className="text-center">
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={confirmEdit}>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>
                    <label>Date Of Birth</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      value={formData.date || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.date}</div>
                  </td>
                  <td>
                    <label>Gender</label>
                  </td>
                  <td>
                    <select
                      id="notice"
                      name="gender"
                      className="form-control"
                      style={{
                        color: "green",
                        appearance: "auto",
                      }}
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </td>
                  <td>
                    <label>Aadhar Card Number</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="adhar"
                      className="form-control"
                      value={formData.adhar || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.adhar}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>PAN Card Number</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pan"
                      className="form-control"
                      value={formData.pan || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.pan}</div>
                  </td>
                  <td>
                    <label>Do you have a Passport?</label>
                  </td>
                  <td>
                    <select
                      id="id"
                      name="val1"
                      style={{ color: "green", appearance: "auto" }}
                      value={formData.val1}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  {formData.val1 === "yes" && (
                    <>
                      <td>
                        <label>Passport Number</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="passportnumber"
                          className="form-control"
                          value={formData.passportnumber || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">
                          {errors.passportnumber}
                        </div>
                      </td>
                    </>
                  )}
                </tr>

                <tr>
                  {formData.val1 === "yes" && (
                    <>
                      <td>
                        <label>Passport Status</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="status1"
                          className="form-control"
                          value={formData.status1 || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.status1}</div>
                      </td>
                      <td>
                        <label>Passport Expiry Date</label>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="exp1"
                          className="form-control"
                          value={formData.exp1 || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.exp1}</div>
                      </td>
                    </>
                  )}
                  <td>
                    <label>Do you have a VISA? </label>
                  </td>
                  <td>
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
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  {formData.val2 === "yes" && (
                    <>
                      <td>
                        <label>VISA Number</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="visanumber"
                          className="form-control"
                          value={formData.visanumber || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.visanumber}</div>
                      </td>
                      <td>
                        <label>VISA Type</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="status2"
                          className="form-control"
                          value={formData.status2 || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.status2}</div>
                      </td>
                      <td>
                        <label>VISA Expiry Date </label>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="exp2"
                          className="form-control"
                          value={formData.exp2 || ""}
                          onChange={handleInputChange}
                          required
                        />
                        <div className="text-danger">{errors.exp2}</div>
                      </td>
                    </>
                  )}
                </tr>

                <tr>
                  <td>
                    <label>State </label>
                  </td>
                  <td>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      onFocus={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select State</option>
                      {stateList.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-danger">{errors.state}</div>
                  </td>
                  <td>
                    <label>City</label>
                  </td>
                  <td>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select City</option>
                      {cityList.map((city, index) => (
                        <option key={index} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-danger">{errors.city}</div>
                  </td>
                  <td>
                    <label>Address</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.adress}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>PIN Code</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="pinnumber"
                      className="form-control"
                      value={formData.pinnumber || ""}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-danger">{errors.pinnumber}</div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6}>
                    <h6>Upload Files</h6>
                  </td>
                </tr>
                <tr>
                  <td>Aadhar File</td>
                  <td>
                    <input
                      type="file"
                      name="aadharFile"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="text-danger">{adharFileSizeError}</div>
                  </td>
                  <td>PAN File</td>
                  <td>
                    <input
                      type="file"
                      name="panFile"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="text-danger">{panFileSizeError}</div>
                  </td>
                  <td>Resume</td>
                  <td>
                    <input
                      type="file"
                      name="otherFile"
                      onChange={handleFileChange}
                      className="form-control"
                    />
                    {otherFileSizeError && (
                      <div className="text-danger">{otherFileSizeError}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Passport File</td>
                  <td>
                    <input
                      type="file"
                      name="passportFile"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="text-danger">{passportFileSizeError}</div>
                  </td>
                  <td>VISA File</td>
                  <td>
                    <input
                      type="file"
                      name="visaFile"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="text-danger">{visaFileSizeError}</div>
                  </td>
                </tr>
              </tbody>
            </table>

            <center>
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
      </div>

      <center>
        <a href="javascript:history.go(-1)">Go Back</a>
      </center>
      <br />
      <br />
    </div>
  );
};

export default UserPersonalEdit;
