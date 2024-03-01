import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserRegister, getAllReisters } from "./Services/Api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchEmployees = () => {
    getAllReisters()
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("AxiosError:", error.message);
        console.error("Error details:", error.response);
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      ename: "",
      mob: "",
      password: "",
      cnpassword: "",
      showPassword: false,
      showPassword1: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      ename: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Name should contain only alphabets")
        .required("Name is required"),
      mob: Yup.string()
        .matches(/^\d{10}$/, "Invalid mobile number")
        .required("Mobile number is required"),
      password: Yup.string().required("Password is required"),
      cnpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const isEmailExists = formData.some(
          (user) => user.email === values.email
        );
        const isMobExists = formData.some(
          (user) => user.mob === values.mob
        );
        if (
          !values.password.match(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*&@#]).{6,}/
          )
        ) {
          alert(
            "Password Should Minimum 6 Digits,Should have at least one uppercase and  Lowercase,One Numeric And Special Symbols Like @,&,*,#"
          );
          return;
        }
        if (isEmailExists) {
          setFieldError("email", "Email is already in use.");
          return;
        }
        setFieldError("email", "");
        if (isMobExists) {
          setFieldError("mob", "Mobile Number is already in use.");
          return;
        }
        setFieldError("mob", "");
        setLoading(true);

        const response = await UserRegister(values);
        if (response.data === "otp1") {
          navigate("/otp", { state: { data: values } }); // Use navigate to change the route
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const setResponse = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const setResponse1 = () => {
    formik.setFieldValue("showPassword1", !formik.values.showPassword1);
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
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <div
        className="row g-3 d-flex justify-content-center align-items-center"
        style={{ paddingTop: "9%" }}
      >
        <h3 className="mb-4 text-center">
          Sign Up For ONiE Soft Job Application
        </h3>

        <div className="col-md-7 mb-2">
          <center>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div id="register" className="col-md-6 mb-4">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    className={`border border-dark form-control ${
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
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Name</label>
                  <input
                    type="text"
                    name="ename"
                    placeholder="Enter Name"
                    className={`border border-dark form-control ${
                      formik.touched.ename && formik.errors.ename
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.ename}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.ename && formik.errors.ename && (
                    <div className="invalid-feedback">
                      {formik.errors.ename}
                    </div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mob"
                    placeholder="Enter Mobile Number"
                    className={`border border-dark form-control ${
                      formik.touched.mob && formik.errors.mob
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.mob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.mob && formik.errors.mob && (
                    <div className="invalid-feedback">{formik.errors.mob}</div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Password</label>
                  <div className="input-group">
                    <input
                      type={formik.values.showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      className={`border border-dark form-control ${
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
                      style={{ border: "1px solid black" }}
                    className="btn btn-"
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
                    <div
                      style={{ display: "flex" }}
                      className="invalid-feedback"
                    >
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div id="register" className="col-md-6 mb-4">
                  <label>Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={formik.values.showPassword1 ? "text" : "password"}
                      name="cnpassword"
                      placeholder="Enter Confirm Password"
                      className={`border border-dark form-control ${
                        formik.touched.cnpassword && formik.errors.cnpassword
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.cnpassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    <button
                      type="button"
                      style={{ border: "1px solid black" }}
                      className="btn btn-"
                      onClick={setResponse1}
                    >
                      {formik.values.showPassword1 ? (
                        <FaEye style={{ height: "20px", width: "20px" }} />
                      ) : (
                        <FaEyeSlash style={{ height: "20px", width: "20px" }} />
                      )}
                    </button>
                  </div>
                  {formik.touched.cnpassword && formik.errors.cnpassword && (
                    <div
                      style={{ display: "flex" }}
                      className="invalid-feedback"
                    >
                      {formik.errors.cnpassword}
                    </div>
                  )}
                </div>
              </div>
              <br />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ width: "150px" }}
              >
                Submit
              </button>
            </form>
          </center>
          <div style={{ paddingTop: "40px" }}>
            <center>
              <Link to="/">Login, if you have an account!</Link>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
