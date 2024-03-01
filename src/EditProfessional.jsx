import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file

const EditProfessional = () => {
  // State variables
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const email = location.state.data.email;
  const navigate = useNavigate();

  // State object to store form field values
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployeeData = (email) => {
    axios
      .get(`http://localhost:1279/viewprofessional?email=${email}`)
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:1279/prosave", formData)
      .then((response) => {
        if (response.data === "personaldetails") {
          navigate("/success1"); // Use navigate to change the route
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h2 className="text-center">Edit Professional Details</h2>

      <div className="text-center">
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form>
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <td>
                    <th>Job Applied For</th>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={formData.id || ""}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      readOnly
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
                      onChange={handleInputChange}
                      readOnly
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      name="workedYears"
                      value={formData.workedYears || ""}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
          </form>
        )}
        <br />
        <br />
        <button className="btn btn-primary" onClick={handleSubmit1}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfessional;
