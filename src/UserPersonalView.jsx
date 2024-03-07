import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./ViewProApplication.css"; // Import your custom CSS file
import { CgProfile } from "react-icons/cg";
import { getViewAddmore } from "./Services/Api";
const UserPersonalView = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [fileContent,setFileContent]=useState([]);
  const email = location.state.data.email;
  const data = {
    email: email,
  };
  const navigate = useNavigate();

  // State object to store form field values
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEmployeeData(email);
  }, [email]);

  const fetchEmployeeData = (email) => {
    //axios
    //  .get(`http://localhost:1279/viewpersonal?email=${regno}`)
    getViewAddmore(email)
      .then((response) => {
        setLoading(false);

        // Set the initial values of form fields from employeeData
        setFormData(response.data);
        setFileContent(response.data.fileContents);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const handleSubmit2 = () => {
    navigate("/profile", { state: { data: data } });
  };
  const handleDownload = (fileName, content, fileType) => {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
const handleSubmit5=()=>{
   navigate("/ViewAllPersonal",{state:{data:data}})
}
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
      <h2 className="text-center">Personal Details</h2>
      <h3 className="text-center">Your Application ID is {formData.regno} </h3>
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
                    <label>Date Of Birth</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="date"
                      className="form-control"
                      value={formData.date || ""}
                      required
                    />
                  </td>
                  <td>
                    <label>Gender</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.gender}
                    />
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
                      required
                    />
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
                      required
                    />
                  </td>
                  {formData.val1 === "yes" && (
                    <>
                      <td>
                        <label>Do you have a Passport?</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.val1}
                        />
                      </td>

                      <td>
                        <label>Passport Number</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="passportnumber"
                          className="form-control"
                          value={formData.passportnumber || ""}
                          required
                        />
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
                          required
                        />
                      </td>
                      <td>
                        <label>Passport Expiry Date</label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="exp1"
                          className="form-control"
                          value={formData.exp1 || ""}
                          required
                        />
                      </td>
                    </>
                  )}
                  {formData.val2 === "yes" && (
                    <>
                      <td>
                        <label>Do you have a VISA? </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.val2}
                        />
                      </td>
                    </>
                  )}
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
                          required
                        />
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
                          required
                        />
                      </td>
                      <td>
                        <label>VISA Expiry Date </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="exp2"
                          className="form-control"
                          value={formData.exp2 || ""}
                          required
                        />
                      </td>
                    </>
                  )}
                </tr>

                <tr>
                  <td>
                    <label>Address</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address || ""}
                      required
                    />
                  </td>
                  <td>
                    <label>City</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city || ""}
                      required
                    />
                  </td>
                  <td>
                    <label>State </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={formData.state || ""}
                      required
                    />
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
                      required
                    />
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
                    <div >
                  <img style={{height:"150px",width:"150px"}} key={0} src={`data:image/png;base64,${fileContent[0]}`} alt={`Image ${fileContent[0] + 1}`} />
                  </div>
                  </td>
                  <td>PAN File</td>
                  <td>
                  <div >
                  <img style={{height:"150px",width:"150px"}} key={1} src={`data:image/png;base64,${fileContent[1]}`} alt={`Image ${fileContent[1] + 1}`} />
                  </div>
                  </td>
                  <td>Resume File</td>
                  <td>
                  <div >
                  <object data={`data:application/pdf;base64,${fileContent[4]}`} type="application/pdf" width="150" height="150">
                  <p>Your browser does not support embedded PDFs.</p>
                         </object>
                  </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                <td>
    {/* Add a download link for the otherFile */}
    {fileContent[0] && (
      <a
        href={`data:image/png;base64,${fileContent[0]}`}
        download="adhar.png"
      >
        Download Aadhar
      </a>
    )}
  </td>
  <td></td>
  <td>  {fileContent[1] && (
      <a
        href={`data:image/png;base64,${fileContent[1]}`}
        download="pan.png"
      >
        Download PAN
      </a>
    )}
    </td>
    <td></td>
    <td>
    <td>
    {fileContent[4] && (
      <a
        href={`data:application/pdf;base64,${fileContent[4]}`}
        download="resume.pdf"
      >
        Download Resume
      </a>
    )}
  </td>
    </td>
                </tr>
                <tr>
                  <td>Passport File</td>
                  <td>
                  <div >
                  <img style={{height:"150px",width:"150px"}} key={2} src={`data:image/png;base64,${fileContent[2]}`} alt={`Image ${fileContent[2] + 1}`} />
                  </div>
                  </td>
                 
                  <td>VISA File</td>
                  <td>
                  <div >
                  <img style={{height:"150px",width:"150px"}} key={3} src={`data:image/png;base64,${fileContent[3]}`} alt={`Image ${fileContent[3] + 1}`} />
                  </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>  {fileContent[2] && (
      <a
        href={`data:image/png;base64,${fileContent[2]}`}
        download="passport.png"
      >
        Download Passport
      </a>
    )}</td>
    <td>
    </td>
    <td>
    {fileContent[3] && (
      <a
        href={`data:image/png;base64,${fileContent[3]}`}
        download="visa.png"
      >
        Download VISA
      </a>
    )}
    </td>
                </tr>
              </tbody>
            </table>
            <center>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit5}
                style={{ width: "150px" }}
              >
                Edit
              </button>
            </center>
          </form>
        )}
        <br />
        <br />
      </div>
      <div>
      
    </div>
      <center>
        <a href="javascript:history.go(-1)">Go Back</a>
      </center>
      <br />
      <br />
    </div>
  );
};

export default UserPersonalView;
