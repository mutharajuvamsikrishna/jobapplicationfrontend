import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { putUserAddmore, getViewAddmore } from "./Services/Api";
import { CgProfile } from 'react-icons/cg';
import * as Yup from "yup";
import "./PersonalDetailsEdit.css";
import { Country, State, City } from "country-state-city";
const UserPersonalEdit = () => {
  const navigate = useNavigate(); // Import useNavigate
  const location = useLocation();
  const email = location.state.data.email;
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    fetchPersonalData(email);
    fetchStates();
  }, [email]);

  const fetchPersonalData = (email) => {
    getViewAddmore(email)
      .then((response) => {
        formik.setValues({
          regno: response.data.regno || "",
          email: response.data.email || "",
          aadhar: response.data.adhar || "",
          pan: response.data.pan || "",
          val1: response.data.val1 || "",
          status1: response.data.status1 || "",
          passportnumber: response.data.passportnumber || "",
          exp1: response.data.exp1 || "",
          val2: response.data.val2 || "",
          status2: response.data.status2 || "",
          visanumber: response.data.visanumber || "",
          exp2: response.data.exp2 || "",
          gender: response.data.gender || "",
          date: response.data.date || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          pinnumber: response.data.pinnumber || "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchStates = () => {
    const states = State.getStatesOfCountry("IN").map((states) => ({
      name: states.name,
      isoCode: states.isoCode,
    }));
    setStateList(states);
  };
  const fetchCities = (selectedState) => {
    const stateCode = stateList.find(
      (state) => state.name === selectedState
    )?.isoCode;
    if (stateCode) {
      const city = City.getCitiesOfState("IN", stateCode).map(
        (city) => city.name
      );
      setCityList(city);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      aadhar: "",
      pan: "",
      val1: "",
      status1: "",
      passportnumber: "",
      exp1: "",
      val2: "",
      status2: "",
      visanumber: "",
      exp2: "",
      gender: "",
      date: "",
      address: "",
      city: "",
      state: "",
      pinnumber: "",
      aadharFile: "",
      panFile: "",
      visaFile: "",
      passportFile: "",
      otherFile: "",
    },
    validationSchema: Yup.object().shape({
      aadhar: Yup.string()
        .matches(/^\d{12}$/, "Aadhar number must be a 12-digit numeric value")
        .required("required"),
      pan: Yup.string()
        .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, "Invalid PAN Card number")
        .required("required"),
      val1: Yup.string().required("required"),
      status1: Yup.string().when("val1", (val1, schema) => {
        if (val1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),

      passportnumber: Yup.string().when("val1", (val1, schema) => {
        if (val1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      exp1: Yup.string().when("val1", (val1, schema) => {
        if (val1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      val2: Yup.string().when("val1", (val1, schema) => {
        if (val1[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      status2: Yup.string().when("val2", (val2, schema) => {
        if (val2[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      visanumber: Yup.string().when("val2", (val2, schema) => {
        if (val2[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      exp2: Yup.string().when("val2", (val2, schema) => {
        if (val2[0] === "Yes") {
          return schema.required("required");
        }
        return schema;
      }),
      gender: Yup.string().required("required"),
      date: Yup.date().max(new Date(), "Invalid Date").required("required"),
      address: Yup.string().required("required"),
      city: Yup.string().required("required"),
      state: Yup.string().required("required"),
      pinnumber: Yup.string()
        .matches(/^\d{6}$/, "PIN number must be a 6-digit numeric value")
        .required("required"),
      aadharFile: Yup.mixed()
        .test(
          "fileSize",
          "File size is between 20kb and 50kb",
          (value) =>
            !value || (value && value.size <= 51200 && value.size >= 20480) // 20kb to 50kb in bytes
        )
        .test(
          "fileType",
          "Only JPG, JPEG, or PNG files are allowed",
          (value) => {
            if (!value) return true; // if no file is provided, validation passes
            const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
            return acceptedFormats.includes(value.type);
          }
        ),
      panFile: Yup.mixed()
        .test(
          "fileSize",
          "File size is between 20kb and 50kb",
          (value) =>
            !value || (value && value.size <= 51200 && value.size >= 20480) // 20kb to 50kb in bytes
        )
        .test(
          "fileType",
          "Only JPG, JPEG, or PNG files are allowed",
          (value) => {
            if (!value) return true; // if no file is provided, validation passes
            const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
            return acceptedFormats.includes(value.type);
          }
        ),
      otherFile: Yup.mixed()
        .test(
          "fileSize",
          "File size is between 20kb and 50kb",
          (value) =>
            !value || (value && value.size <= 104857600 && value.size >= 20480) // 20KB to 100MB in bytes
          // 20kb to 50kb in bytes
        )
        .test("fileType", "Only PDF files are allowed", (value) => {
          if (!value) return true; // if no file is provided, validation passes
          const acceptedFormats = ["application/pdf"];
          return acceptedFormats.includes(value.type);
        }),
      passportFile: Yup.mixed().when("val1", (val1, schema) => {
        if (val1[0] === "Yes") {
          return schema
            .test(
              "fileType",
              "Only JPG, JPEG, or PNG files are allowed",
              (value) => {
                if (!value) return true; // if no file is provided, validation passes
                const acceptedFormats = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                ];
                return acceptedFormats.includes(value.type);
              }
            )
            .test(
              "fileSize",
              "File size is between 20kb and 50kb",
              (value) =>
                !value || (value && value.size <= 51200 && value.size >= 20480) // 20kb to 50kb in bytes
            );
        } else {
          return schema; // Return the schema without any additional validation if val2 is not "Yes"
        }
      }),

      visaFile: Yup.mixed().when("val2", (val2, schema) => {
        if (val2[0] === "Yes") {
          return schema
            .test(
              "fileType",
              "Only JPG, JPEG, or PNG files are allowed",
              (value) => {
                if (!value) return true; // if no file is provided, validation passes
                const acceptedFormats = [
                  "image/jpeg",
                  "image/jpg",
                  "image/png",
                ];
                return acceptedFormats.includes(value.type);
              }
            )
            .test(
              "fileSize",
              "File size is between 20kb and 50kb",
              (value) =>
                !value || (value && value.size <= 51200 && value.size >= 20480) // 20kb to 50kb in bytes
            );
        } else {
          return schema; // Return the schema without any additional validation if val2 is not "Yes"
        }
      }),
    }),
    onSubmit: async (values) => {
      try {
        const confirmed = window.confirm(
          "Are you sure you want to save the changes?"
        );
        if (!confirmed) {
          return;
        }
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await putUserAddmore(formData);

        if (response.status === 200 || response.status === 201) {
          alert("Details Saved Sucess Fully");
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
  const handleSubmit2 = () => {
    navigate("/profile", { state: { data: data } });
  };
  console.log(formik.errors);
  return (
    <div className="personaldetailsEdit">
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
      <div className="row g-3 justify-content-center align-items-center">
        <h4 className="text-center text-primary">Personal Details</h4>
        <div className="col-md-12 mb-2">
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-4 mb-4">
                <label>Gender</label>
                <select
                  name="gender"
                  style={{ appearance: "auto" }}
                  className={`border  form-control ${
                    formik.touched.gender && formik.errors.gender
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="invalid-feedback">{formik.errors.gender}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  name="date"
                  value={formik.values.date} // Using formik.values.date as the value
                  onChange={formik.handleChange}
                  onFocus={formik.handleBlur} // Assuming onFocus should be formik.handleBlur
                  className={`border form-control ${
                    formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                  }`}
                  required
                  id="dateOfBirth"
                  autoComplete="date"
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  placeholder="Enter Aadhar Number"
                  name="aadhar"
                  value={formik.values.aadhar} // Using formik.values.aadhar as the value
                  onChange={formik.handleChange}
                  onFocus={formik.handleBlur} // Assuming onFocus should be formik.handleBlur
                  className={`border form-control ${
                    formik.touched.aadhar && formik.errors.aadhar
                      ? "is-invalid"
                      : ""
                  }`}
                  required
                  id="aadharNumber"
                  autoComplete="aadhar-number"
                />
                {formik.touched.aadhar && formik.errors.aadhar && (
                  <div className="invalid-feedback">{formik.errors.aadhar}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>PAN Card Number</label>
                <input
                  type="text"
                  placeholder="Enter PAN Number"
                  name="pan"
                  value={formik.values.pan}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`border form-control ${
                    formik.touched.pan && formik.errors.pan ? "is-invalid" : ""
                  }`}
                  required
                  id="pan"
                  autoComplete="pan-number"
                />
                {formik.touched.pan && formik.errors.pan && (
                  <div className="invalid-feedback">{formik.errors.pan}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label>Do you Have Passport?</label>
                <select
                  name="val1"
                  style={{ appearance: "auto" }}
                  className={`border  form-control ${
                    formik.touched.val1 && formik.errors.val1
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.val1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formik.touched.val1 && formik.errors.val1 && (
                  <div className="invalid-feedback">{formik.errors.val1}</div>
                )}
              </div>
              {formik.values.val1 === "Yes" && (
                <>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="passportnumber">Passport Number</label>
                    <input
                      type="text"
                      name="passportnumber"
                      placeholder="Enter Passport Number"
                      value={formik.values.passportnumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border form-control ${
                        formik.touched.passportnumber &&
                        formik.errors.passportnumber
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                      id="passportnumber"
                      autoComplete="passport-number"
                    />
                    {formik.touched.passportnumber &&
                      formik.errors.passportnumber && (
                        <div className="invalid-feedback">
                          {formik.errors.passportnumber}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="status1">Passport Status</label>
                    <input
                      type="text"
                      name="status1"
                      placeholder="Enter Passport Status"
                      value={formik.values.status1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border form-control ${
                        formik.touched.status1 && formik.errors.status1
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                      id="status1"
                      autoComplete="status1"
                    />
                    {formik.touched.status1 && formik.errors.status1 && (
                      <div className="invalid-feedback">
                        {formik.errors.status1}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="exp1">Passport Expiry Date</label>
                    <input
                      type="date"
                      name="exp1"
                      value={formik.values.exp1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border form-control ${
                        formik.touched.exp1 && formik.errors.exp1
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                      id="exp1"
                      autoComplete="exp1"
                    />
                    {formik.touched.exp1 && formik.errors.exp1 && (
                      <div className="invalid-feedback">
                        {formik.errors.exp1}
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="passportFile">Passport File</label>
                    <input
                      type="file"
                      name="passportFile"
                      onChange={(event) => {
                        formik.setFieldValue(
                          "passportFile",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.passportFile &&
                        formik.errors.passportFile
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.passportFile &&
                      formik.errors.passportFile && (
                        <div className="invalid-feedback">
                          {formik.errors.passportFile}
                        </div>
                      )}
                  </div>
                  <div className="col-md-4 mb-4">
                    <label htmlFor="prev">Do you have a VISA?</label>
                    <select
                      id="prev"
                      name="val2"
                      style={{ appearance: "auto" }}
                      value={formik.values.val2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${
                        formik.touched.val2 && formik.errors.val2
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {formik.touched.val2 && formik.errors.val2 && (
                      <div className="invalid-feedback">
                        {formik.errors.val2}
                      </div>
                    )}
                  </div>
                  {formik.values.val2 === "Yes" && (
                    <>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="languages">Visa Number</label>
                        <input
                          type="text"
                          placeholder="Enter Visa Number"
                          name="visanumber"
                          value={formik.values.visanumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.visanumber &&
                            formik.errors.visanumber
                              ? "is-invalid"
                              : ""
                          }`}
                          required
                          autoComplete="visanumber"
                        />
                        {formik.touched.visanumber &&
                          formik.errors.visanumber && (
                            <div className="invalid-feedback">
                              {formik.errors.visanumber}
                            </div>
                          )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="visaType">VISA Type</label>
                        <input
                          type="text"
                          placeholder="Enter Visa Type"
                          name="status2"
                          value={formik.values.status2}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.status2 && formik.errors.status2
                              ? "is-invalid"
                              : ""
                          }`}
                          required
                        />
                        {formik.touched.status2 && formik.errors.status2 && (
                          <div className="invalid-feedback">
                            {formik.errors.status2}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="visaExpiryDate">VISA Expiry Date</label>
                        <input
                          type="date"
                          name="exp2"
                          value={formik.values.exp2}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.exp2 && formik.errors.exp2
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.exp2 && formik.errors.exp2 && (
                          <div className="invalid-feedback">
                            {formik.errors.exp2}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4 mb-4">
                        <label htmlFor="visaFile">VISA File</label>
                        <input
                          type="file"
                          name="visaFile"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "visaFile",
                              event.currentTarget.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.visaFile && formik.errors.visaFile
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.visaFile && formik.errors.visaFile && (
                          <div className="invalid-feedback">
                            {formik.errors.visaFile}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="col-md-4 mb-4">
                <label htmlFor="state">State</label>
                <select
                  name="state"
                  id="state"
                  className={`border form-control ${
                    formik.touched.state && formik.errors.state
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.state}
                  style={{ appearance: "auto" }}
                  onChange={(event) => {
                    formik.handleChange(event);
                    fetchCities(event.target.value); // Fetch cities when state changes
                  }}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select a state</option>
                  {stateList.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {formik.touched.state && formik.errors.state && (
                  <div className="invalid-feedback">{formik.errors.state}</div>
                )}
              </div>

              <div className="col-md-4 mb-4">
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  style={{ appearance: "auto" }}
                  id="city"
                  className={`border form-control ${
                    formik.touched.city && formik.errors.city
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value={formik.values.city}>
                    {formik.values.city}
                  </option>
                  {cityList.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {formik.touched.city && formik.errors.city && (
                  <div className="invalid-feedback">{formik.errors.city}</div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : ""
                  }`}
                  required
                  autoComplete="address"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label htmlFor="pinnumber">PIN Code</label>
                <input
                  type="text"
                  placeholder="Enter Pin Code"
                  name="pinnumber"
                  value={formik.values.pinnumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.pinnumber && formik.errors.pinnumber
                      ? "is-invalid"
                      : ""
                  }`}
                  required
                />
                {formik.touched.pinnumber && formik.errors.pinnumber && (
                  <div className="invalid-feedback">
                    {formik.errors.pinnumber}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label htmlFor="aadharFile">Aadhar File</label>
                <input
                  type="file"
                  name="aadharFile"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "aadharFile",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.aadharFile && formik.errors.aadharFile
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.aadharFile && formik.errors.aadharFile && (
                  <div className="invalid-feedback">
                    {formik.errors.aadharFile}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label htmlFor="panFile">PAN File</label>
                <input
                  type="file"
                  name="panFile"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "panFile",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.panFile && formik.errors.panFile
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.panFile && formik.errors.panFile && (
                  <div className="invalid-feedback">
                    {formik.errors.panFile}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-4">
                <label htmlFor="otherFile">Resume</label>
                <input
                  type="file"
                  name="otherFile"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "otherFile",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.otherFile && formik.errors.otherFile
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.otherFile && formik.errors.otherFile && (
                  <div className="invalid-feedback">
                    {formik.errors.otherFile}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="text-center"
        style={{ paddingTop: "30px", paddingBottom: "20px" }}
      >
        <a href="javascript:history.go(-1)">Go Back</a>
      </div>
    </div>
  );
};

export default UserPersonalEdit;
