import React from "react";
import "../../App.css";
import appLogo from "../../SVGs/pureLogo.svg";

function About() {
  return (
    <div>
      <img className="appSmallLogo" src={appLogo} alt="App Logo" />
      <h1> About Page </h1>{" "}
      <div className="items">
        <div className="foodCard">
          <h1>Current Order</h1>
        </div>
      </div>
    </div>
  );
}

export default About;
