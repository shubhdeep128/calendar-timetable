import React from "react";
import "../../App.css";
import appLogo from "../../SVGs/pureLogo.svg";

function Order() {
  return (
    <div>
      <img className="appSmallLogo" src={appLogo} alt="App Logo" />
      <h1> Order Page </h1>
      <div className="items">
        <div className="foodCard">
          <h1>Pav Bhaji</h1>
        </div>
      </div>
    </div>
  );
}

export default Order;
