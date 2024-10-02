import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";
import logo from "../img/logo.png";


function Navigation() {
  return (
    <>
      <Navbar className="navbar">
        <img src={logo} alt="" />
        <h2>Student management</h2>
      </Navbar>
      
    </>
  );
}

export default Navigation;
