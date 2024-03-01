import React from "react";
import { Link } from "react-router-dom";

export default function AdminPasswordmsg() {
  return (
    <div className="container">
      <br /> <br /> <br />
      <div className="row">
        <div className="col-md-12">
          <div className="mt-5 text-center">
            <h3 style={{ color: "green" }}>Password Change Successfully</h3>
            <br /> <br /> <br /> <br />
            <Link to="/adminlogin" className="btn btn-primary">
              Go Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
