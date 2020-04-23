import React from "react";
import logo from "../../logo.svg";
import "../../App.css";

function App() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">Universical</h1>
      <div className="google-btn">
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google icon"
          />
        </div>
        <a className="btn-text" href="/auth/google">
          Login with Google
        </a>
      </div>
      <br />
      <a href="/schedule">/schedule</a>
      <a href="/api/event">/api/event</a>
      <a href="/api/event/add">/api/event/add</a>
    </header>
  );
}

export default App;
