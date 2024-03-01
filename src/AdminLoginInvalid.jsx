import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminLoginInvalid() {
  return (
    <div style={{paddingTop:"100px"}}>


      <center>
        <h1 style={{ color: 'red' }}>Invalid credentials</h1>
        <br /> <br /> <br />
     <Link to="/">Go Back</Link>
      </center>




    </div>
  )
}
