import React from "react";
import "./App.css";
import hamburger from "./SVGs/home.svg";
import smallLogoSVG from "./SVGs/smallLogo.svg";
import uploadSVG from "./SVGs/upload.svg";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navBar">
      <Link to={"/"}>
        <img src={hamburger} alt="Hamburger" />
      </Link>
      <Link to={"/"}>
        <img className="logoSVG" src={smallLogoSVG} alt="Logo" />
      </Link>
      <Link to={"/upload"}>
        <h3>
          <img className="uploadSVG" src={uploadSVG} alt="upload logo"></img>
          &nbsp;
        </h3>
      </Link>
      {/* <Link to={"/order"}>
              <h3> Order </h3>
            </Link> */}
    </nav>
  );
}

export default Nav;
