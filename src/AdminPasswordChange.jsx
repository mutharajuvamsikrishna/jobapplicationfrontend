import React, {useEffect,useState}from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { putAdminPasswordChange } from './Services/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  cnpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
const AdminPasswordChange=()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.data.email;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    // Automatically navigate to login after 10 seconds when showModal is true
    if (showModal) {
      const timeoutId = setTimeout(() => {
        handleClose();
        navigate("/");
      }, 10000); // 10 seconds in milliseconds

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [showModal]); // Run this effect whenever showModal changes
  const formik = useFormik({
    initialValues: {
      password: '',
      cnpassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      if (!values.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/ )) {
        alert(
          "Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#");
        return false;
      }
      try {
        const data = {
          email: email,
          password: values.password,
        };

        await putAdminPasswordChange(data);
        handleShow();
      } catch (error) {
        console.error(error);
      }
    },
  });


  return (
    <>
      
      <div className='password' style={{ backgroundColor: '', height: '99vh', paddingTop: "90px" }}>
  <center>
   
    <br />
    <form onSubmit={formik.handleSubmit} className='p-4 border border-whitesmoke '>
    <h3 style={{color:"blue"}}>ONiE Soft</h3>
    <br/>
    <h4>Admin Change Password</h4>
    <div className="form-group row justify-content-center align-items-center p-3">
  <label htmlFor="password" className='col-sm-1 col-form-label fw-semibold'>Password</label>
  <div className="col-sm-3 ">
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter password"
      autoComplete='password'
      className={`border border-dark form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      
      required
    />
  </div>
  <p className="text-danger">{formik.touched.password && formik.errors.password}</p>
</div>

      <div className="form-group row justify-content-center align-items-center">
        <label htmlFor="cnpassword" className='col-sm-1 col-form-label fw-semibold'>Confirm Password</label>
        <div className="col-sm-3">
          <input
            type="password"
            id="cnpassword"
            name="cnpassword"
            placeholder="Enter Confirm Password"
            autoComplete='tel'
            className={`border border-dark form-control ${formik.touched.cnpassword && formik.errors.cnpassword ? "is-invalid" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cnpassword}
           
            required
          />
          <p className="text-danger">{formik.touched.cnpassword && formik.errors.cnpassword}</p>
        </div>
      </div>

      <div className="form-group row">
        <div className="col-sm-10 offset-sm-1 pt-2">
          <button type="submit" className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </form>
    <br />
    <Link to="/adminlogin">Go Back</Link>
  </center>
</div>
<Modal show={showModal} onHide={handleClose}className="p-5">
        <Modal.Header closeButton>
          <Modal.Title className="p-1">Password Changed Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your Password Changed successfully. You can now log in.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { handleClose(); navigate("/adminlogin"); }}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AdminPasswordChange;