import React from 'react';
import OnieLogoImage from './Images/oniesoft-final1.png';
import "./ViweAll.css";

const Onielogo = () => {
  return (
    <div className="logo-container">
      <a href="/">
        <img
          src={OnieLogoImage}
          alt="ONiE SOFT"
          className="img-fluid"
        />
      </a>
    </div>
  );
};

export default Onielogo;
