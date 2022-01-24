import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { useSelector } from "react-redux";
import addresses_red from "../../assets/img/logo.svg";
var ps;

function Sidebar(props) {
  const user = useSelector((state) => state.login.user);
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a href="#" className="simple-text logo-mini">
          <div className="logo-img">
            
          </div>
        </a>
        <a href="#" className="simple-text logo-normal">
          Addresses
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            let validateRol = false;
            prop.rol.forEach((rol) => {
              if (rol === user?.rol) {
                validateRol = true;
              }
            });
            if (validateRol && prop.visible) {
              return (
                <li
                  className={
                    activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            }
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
