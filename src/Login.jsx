import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { postUserLogin } from "./Services/Api";
const  Login=()=> {
  const navigate = useNavigate();
  const [res,setRes]=useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      showPassword: false,
      showPassword1: false,
     
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string().min(6, 'Password should be at least 6 characters').required("Password is required"),
    }),
    onSubmit: async (values) => {
      var v = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/;
      if (!values.password.match(v)) {
        alert(
          "Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#"
        );
        return false;
      }
      try {
        const response = await postUserLogin(values);

        if (response.status === 200) {
          localStorage.setItem('jwtToken', response.data.jwt);
          navigate("/viewapplication", { state: { data: values } });
        }
      } catch (error) {
       setRes(true);
        console.error(error);
        
      }
    },
  });

  const setResponse = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const handleSubmit1 = () => {
    navigate("/register");
  };
  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "99vh" }}>
      <div
        className="row g-3 d-flex justify-content-center align-items-center"
        style={{ paddingTop: "5%" }}
      >
        <h3 className="mb-3 text-center">Login to ONiE Soft</h3>
<div className="text-danger">{res&&(<h5 className="text-center">Invalid Credentials</h5>)}</div>
        <div className="col-md-7 mb-1">
          <center>
            <form onSubmit={formik.handleSubmit}>
              <div id="register" className="col-md-5 mb-4">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              <div id="register" className="col-md-5 mb-4">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={formik.values.showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  <button
                    type="button"
                    className=""
                    style={{ border: "1px solid white" }}
                    onClick={setResponse}
                  >
                    {formik.values.showPassword ? (
                      <FaEye style={{ height: "20px", width: "20px" }} />
                    ) : (
                      <FaEyeSlash style={{ height: "20px", width: "20px" }} />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div style={{ display: "flex" }} className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "50%", fontWeight: "bold", fontSize: "15px" }}
              >
                Sign In
              </button>
            </form>
          </center>

          <div style={{ paddingTop: "30px" }}>
            <center>
              <div>
                <Link to="/forgetpassword">Forgotten account?</Link>
              </div>
              <div style={{ paddingTop: "20px" }}>
                <button className="btn btn-success" onClick={handleSubmit1}>
                  SignUp
                </button>
              </div>
            </center>
          </div>
        </div>
        <div>
          <center>
            <p>OR</p>
       <h4>  <a href="http://localhost:1279">Login With Google</a></h4> 
          </center>
        </div>
      </div>
    </div>
  );
};
export default Login;