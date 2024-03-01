import React from 'react';
import { Link } from 'react-router-dom';

export default function ChangePassSuccess() {
  return (
    
    <div style={{paddingTop:"100px"}}>
       
      
          <div className="mt-5 text-center">
            <h3 style={{ color: 'green' }}>Password Change Successfully</h3>
            <br /> <br /> <br /> <br />
            <Link to="/" className="btn btn-primary">
              Go Back to Login
            </Link>
          </div>
        </div>
     
  );
}
