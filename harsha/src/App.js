import React from "react";
import "./App.css";
import Nav from "./Nav";
import About from "./Components/About/About";
import Order from "./Components/Order/Order.js";
import Home from "./Components/Home/Home.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />{" "}
          <Route path="/order" exact component={Order} />{" "}
          <Route path="/about" exact component={About} />{" "}
          {/* <Route path="/order/:id" exact component={ItemDetail} /> */}{" "}
        </Switch>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
