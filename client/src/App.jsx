import React, { Component } from "react";
import "./App.css";
import Nav from "./Nav";
import About from "./Components/About/About";
import Add from "./Components/Add/Add";
import Home from "./Components/Home/Home";
import Schedule from "./Components/Schedule/Schedule";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add" exact component={Add} />
            <Route path="/about" exact component={About} />
            <Route path="/schedule" exact component={Schedule} />
            {/* <Route path="/order/:id" exact component={ItemDetail} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
