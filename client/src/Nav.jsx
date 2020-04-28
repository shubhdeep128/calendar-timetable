import React from "react";
import "./App.css";
import homeSVG from "./SVGs/home.svg";
import uploadSVG from "./SVGs/upload.svg";

import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to={"/"}>
        <img src={homeSVG} alt="" />
      </Link>
      <Link to={"/upload"}>
        <h3>
          <img className="uploadSVG" src={uploadSVG} alt="upload logo"></img>
          &nbsp; Upload
        </h3>
      </Link>
      {/* <Link to={"/order"}>
              <h3> Order </h3>
            </Link> */}
    </nav>
  );
}

export default Nav;
