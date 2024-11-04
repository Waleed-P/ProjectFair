import React from "react";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Project Fair</h3>
        <p className="footer-description">
          Explore , Add and View Projects Using Project Fair !!
        </p>
        <ul className="footer-links">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/projects"}>Projects</Link>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Project Fair</p>
      </div>
    </footer>
  );
};

export default Footer;
