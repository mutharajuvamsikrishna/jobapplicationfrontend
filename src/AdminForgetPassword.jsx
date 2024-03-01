import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postAdminForgetPassword } from "./Services/Api";
const AdminForgetPassword = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mob: Yup.string()
      .length(10, "Phone number should be 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      mob: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await postAdminForgetPassword(values);

        if (response.status === 200) {
          navigate("/adminchangepassword", { state: { data: values } });
        }
      } catch (error) {
        setRes(true);
        console.error(error);
      } finally {
      setLoading(false);
    }
    },
  });
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
    <>
      <div
        className="password"
        style={{ backgroundColor: "", height: "99vh", paddingTop: "90px" }}
      >
        <center>
          <br />
          <div>
            {res && <h5 className="text-danger">Invalid Credentials</h5>}
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="p-4 border border-whitesmoke "
          >
            <h3 style={{ color: "blue" }}>ONiE Soft</h3>
            <br />
            <h4>Admin Forget Password</h4>
            <div className="form-group row justify-content-center align-items-center p-3">
              <label
                htmlFor="email"
                className="col-sm-1 col-form-label fw-semibold"
              >
                Email
              </label>
              <div className="col-sm-3 ">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  className={`border border-dark form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                <p className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </p>
              </div>
            </div>

            <div className="form-group row justify-content-center align-items-center">
              <label
                htmlFor="mob"
                className="col-sm-1 col-form-label fw-semibold"
              >
                Phone Number
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  id="mob"
                  name="mob"
                  placeholder="Enter Mobile Number"
                  autoComplete="tel"
                  className={`border border-dark form-control ${
                    formik.touched.mob && formik.errors.mob ? "is-invalid" : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mob}
                  required
                />
                <p className="text-danger">
                  {formik.touched.mob && formik.errors.mob}
                </p>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10 offset-sm-1 pt-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <br />
          <Link to="/adminlogin">Go Back</Link>
        </center>
      </div>
    </>
  );
};
export default AdminForgetPassword;
