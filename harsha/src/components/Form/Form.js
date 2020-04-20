import React from "react";
import "./Form.css";

function Form() {
  return (
    <form>
      <h1> Event Details </h1>
      <p> Enter your name: </p>
      <input type="text" />
    </form>
  );
}

// ReactDOM.render(<MyForm />, document.getElementById("root"));

export default Form;
