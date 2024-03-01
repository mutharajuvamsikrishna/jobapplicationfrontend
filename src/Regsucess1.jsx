import React from 'react';
import {  useLocation } from 'react-router-dom';
const Regsucess1 = () => {

  const location = useLocation();
  
 
const data1=location.state.data;
return (
   
  <div style={{paddingTop:'50px'}} className='id15'>
   
    <div style={{float:"right"}}>
    <a href="/adminlogin">Login</a>
      </div><br/><br/>
  <p>Dear {data1.ename},</p>

<p>We are thrilled to inform you that your registration with ONiE Soft has been successfully completed. Welcome aboard! We appreciate your decision to join our growing community.</p>

<p>As a registered member, you now have access to a wide range of exciting features, resources, and opportunities. Whether you're here for learning, networking, or collaboration, we are dedicated to ensuring that your experience with us is nothing short of exceptional.</p>

<p>To help you get started, here is some important information:</p>

<ol>
  <li>
    <strong>Account Details:</strong>
    <ul>
      <li>Username/Email: [User's Email Address]</li>
      <li>Password: [User's Password] (Please keep this confidential)</li>
    </ul>
  </li>
  <li>
    <strong>Profile Completion:</strong>
    <p>We encourage you to complete your profile by adding essential details such as your profile picture, bio, and any other relevant information. This will enhance your visibility within our community and help you connect with like-minded individuals.</p>
  </li>
  <li>
    <strong>Navigation and Features:</strong>
    <p>Familiarize yourself with our platform's navigation and various features. We have designed it to be user-friendly and intuitive, allowing you to easily explore and engage with the content and tools available.</p>
  </li>
  <li>
    <strong>Support and Assistance:</strong>
    <p>Should you encounter any issues or require assistance at any time, our dedicated support team is here to help. Feel free to reach out to us via [contact details], and we'll be more than happy to assist you.</p>
  </li>
</ol>

<p>Once again, thank you for choosing ONiE Soft. We believe that your presence will contribute significantly to our community. We look forward to witnessing your accomplishments and fostering a thriving environment together.</p>

<p>Best Regards,</p>
<p>ONiE Soft TAG Team</p>


<center>
<h3>Login and Update Your Details</h3>

<br/>
<a href="/adminlogin">Login</a><br/><br/>

</center>

</div>
  
);
};

export default Regsucess1;
