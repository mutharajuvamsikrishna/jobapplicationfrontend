import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ViewProApplication.css'; // Import your custom CSS file
import { CgProfile } from 'react-icons/cg';
const EditPersonal = () => {
  // State variables
  
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
      .get(`http://localhost:1279/viewpersonal?regno=${regno}`)
      .then((response) => {
      

        // Filter out keys with null values or empty strings
        const filteredData = Object.fromEntries(
          Object.entries(response.data).filter(([_, value]) => value !== null && value !== "")
        );

      
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
  const confirmEdit = () => {
    if (window.confirm("Are you sure you want to Edit?")) {
      handleSubmit1();
    }
  }
  const handleSubmit1 = (event) => {
   
    var v4 = /^[a-zA-Z\s]*$/;

    var v6 = /^\d{10}$/;
    var v10 = formData.pan;

    var v11 = /[A-Z0-9]/;

    var v9 = /^\d{12}$/;

    var v25 = /^[a-zA-Z\s]*$/;

    var v27 = /^[a-zA-Z\s]*$/;

    var v31 = /^\d{6}$/;
if(formData.name===""){
  alert("Please Fill Name")
}
    if (!formData.name.match(v4)) {
      alert("Name Alphabets Only");

      return false;
    }

    if (!formData.mob.match(v6)) {
      alert("Mobile Number must be 1 to 10 Integers");

      return false;
    }

    if (formData.gender !== "male" && formData.gender !== "female") {
      alert("Please Select Gender");

      return false;
    }
if(formData.adhar===""){
  alert("Please Fill Adhar Number")
}
    if (!formData.adhar.match(v9)) {
      alert("Adhar Number must be 1 to 12 Integers");

      return false;
    }
    if (!formData.pan.match(v11)) {
      alert(" Characters and Numeric have length 10 in pan");

      return false;
    }
    if (v10.length !== 10) {
      alert(" Pan Length Maximum 10 Characters");
      return false;
    }

    if (!formData.adress.match(v25)) {
      alert("Special Characters Not Allowed in Adress ");

      return false;
    }

    if (!formData.city.match(v27)) {
      alert("Special Characters Not Allowed in City");

      return false;
    }

    if (!formData.pinnumber.match(v31)) {
      alert("Pin Number must be 1 to 6 Integers");

      return false;
    }
   
    axios
      .post('http://localhost:1279/persave', formData)
      .then((response) => {
        if (response.data === "sucess") {
          alert("Details Save SuccessFully")
        } else {
          navigate("/regfail");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  const email=formData.email;
  const data={
    email:email
  }
const handleSubmit2=()=>{
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
      onClick={handleSubmit2}
    >
      <CgProfile
        style={{
          height: "50px",
          width: "50px",
          color:"blue"
        }} />
    </div>
      <br /><br /><br /><br />
      <h2 className='text-center'>Edit Personal Details</h2>
<h3 className='text-center'>Your Application ID is {regno}</h3>
      <div className='text-center'>
        {/* Render the form for editing data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={(event) => event.preventDefault()}>
            
            <table className='table table-striped table-bordered'>
                <tbody>
                    <tr>
                        <td>
            <label>Name</label>
            </td>
            <td>
            <input
              type="text"
              name="name"
              value={formData.name|| ''}
              onChange={handleInputChange}  required  
            
            />
            </td>
            <td>
            <label>Email</label>
            </td>
            <td>
            <input
              type="text"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}  
              required  
              readOnly
            />
            </td>
            <td>
            <label>Mobile Number</label>
            </td><td>
            <input
              type="text"
              name="mob"
              value={formData.mob || ''}
              onChange={handleInputChange}  required  
              readOnly
            />
            </td>
            </tr>
            <tr>
                        <td>
            <label>Date Of Birth</label>
            </td>
            <td>
            <input
              type="date"
              name="date"
              value={formData.date || ''}
              onChange={handleInputChange}  required  
              readOnly
            />
            </td>
            <td>
            <label>Gender</label>
            </td>
            <td>
            <select
                  id="notice"
                  name="gender"
                style={{ color: "green", appearance: "auto",width:"230px" }}
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-control"
                  
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
             
              value={formData.adhar || ''}
              onChange={handleInputChange}    
            
              required
            />
            </td>
            </tr>

            <tr>
                        <td>
            <label>Pan Card Number</label>
            </td>
            <td>
            <input
              type="text"
              name="pan"
              value={formData.pan || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>Do you have a Passport?</label>
            </td><td>
            <input
              type="text"
              name="val1"
              value={formData.val1 || ''}
              onChange={handleInputChange} 
               required  
            />
            </td>
            <td>
            <label>Passport Number</label>
            </td><td>
            <input
              type="text"
              name="passportnumber"
              value={formData.passportnumber || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            </tr>

            <tr>
                        <td>
            <label>Passport Status</label>
            </td>
            <td>
            <input
              type="text"
              name="status1"
              value={formData.status1 || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>Passport Expiry Date</label>
            </td><td>
            <input
              type="text"
              name="exp1"
              value={formData.exp1 || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>Do you have a VISA? </label>
            </td><td>
            <input
              type="text"
              name="val2"
              value={formData.val2 || ''} 
              
              onChange={handleInputChange}  required  
            />
            </td>
            </tr>


            <tr>
                        <td>
            <label>VISA Number</label>
            </td>
            <td>
            <input
              type="text"
              name="visanumber"
              value={formData.visanumber || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>VISA Type</label>
            </td><td>
            <input
              type="text"
              name="status2"
              value={formData.status2 || ''}
              onChange={handleInputChange} 
               required  
            />
            </td>
            <td>
            <label>VISA Expiry Date </label>
            </td><td>
            <input
              type="text"
              name="exp2"
              value={formData.exp2 || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            </tr>


            <tr>
                        <td>
            <label>Address</label>
            </td>
            <td>
            <input
              type="text"
              name="adress"
              value={formData.adress || ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>City</label>
            </td><td>
            <input
              type="text"
              name="city"
              value={formData.city|| ''}
              onChange={handleInputChange}  required  
            />
            </td>
            <td>
            <label>State </label>
            </td><td>
            <input
              type="text"
              name="state"
              value={formData.state || ''}
              onChange={handleInputChange}  required  
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
              value={formData.pinnumber || ''}
              onChange={handleInputChange}  required  
            />
            </td>
           
            </tr>
            <tr>
              <td></td>
              <td>
               
              </td>
              <td> 
            <button type="button" className="btn btn-primary" onClick={confirmEdit}>
    Save
  </button>
  </td>
            </tr>
            </tbody>
           </table>
          </form>
        )}
       
      </div>
      <br/>
     <center>
     <a href="javascript:history.go(-1)">Go Back</a>

     </center>
        
    </div>
  );
};

export default EditPersonal;
