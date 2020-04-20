import React, { Component } from "react";
import "./Menu.css";

class Menu extends Component {
  render() {
    console.log(this.props);

    document.addEventListener("DOMContentLoaded", () => {
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );
      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach((el) => {
          el.addEventListener("click", () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });

    // const AdminButton = () => {
    //   if (this.props.current_user.Roles === "Admin") {
    //     return (
    //       <div class="navbar-item has-dropdown is-hoverable">
    //         <a class="navbar-link" href="/admin">
    //           Admin
    //         </a>
    //         <div class="navbar-dropdown">
    //           <a class="navbar-item" href="/admin/courses">
    //             Courses
    //           </a>
    //           <a class="navbar-item" href="/admin/profs/">
    //             Professors
    //           </a>
    //         </div>
    //       </div>
    //     );
    //   } else {
    //     return;
    //   }
    // };
    const LoginButton = () => {
      if (!this.props.loginStatus) {
        return (
          <a class="button is-black is-rounded" href="/auth/google">
            <span>
              {" "}
              <strong>Log in</strong>
            </span>
          </a>
        );
      } else {
        return (
          <a class="button is-black is-rounded" href="/api/logout">
            <span>
              {" "}
              <strong>Log Out</strong>
            </span>
          </a>
        );
      }
    };
    return (
      <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <span class="is-size-4 has-text-weight-bold has-text-black">
                Universical
              </span>
            </a>
            <a
              role="button"
              class="navbar-burger"
              data-target="navbarWeb"
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarWeb" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" href="/upload">
                <span>Upload</span>
              </a>
              <a class="navbar-item" href="/prof">
                <span>Schedule</span>
              </a>
              <a class="navbar-item" href="/about">
                <span>About</span>
              </a>

              {/* {AdminButton()} */}
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">{LoginButton()}</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Menu;
