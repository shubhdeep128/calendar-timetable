import React from "react";
import logo from "../../logo.svg";
import "../../App.css";

function App() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="title">Universical</h1>
      <a href="/api/event">/api/event</a>
      <a href="/api/event/add">/api/event/add</a>
    </header>
  );
}

export default App;
