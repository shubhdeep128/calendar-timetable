import React, { Component } from "react";
import "./App.css";
import Nav from "./Nav";
import About from "./Components/About/About";
import Order from "./Components/Order/Order";
import Home from "./Components/Home/Home";
import Schedule from "./Components/Schedule/Schedule";
import Delete from "./Components/Delete"
import Update from "./Components/Update"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/order" exact component={Order} />
            <Route path="/about" exact component={About} />
            <Route path="/schedule" exact component={Schedule} />
            <Route path="/update/:id" exact component={Update} />
            <Route path="/delete/:id" exact component={Delete} />

            {/* <Route path="/order/:id" exact component={ItemDetail} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
