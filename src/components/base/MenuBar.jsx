import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../store/reducer";
import { push } from "redux-first-history";


const MenuBar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.usuario.token);
  const user = useSelector((state) => state.login.usuario.user);
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(push("/login"));
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        style={{ background: "#EEEEEE" }}
        id="mainNav"
      >
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {user && (
            <>
              {user.nombre} {user.apellido}
            </>
          )}
          <div style={{ display: "flex", marginLeft: "auto" }}>
            &nbsp;&nbsp;
            {token ? (
              <>
                &nbsp;&nbsp;
                <Link
                  to="/"
                  className="btn btn-outline-secondary my-2 my-sm-0"
                >
                  Inicio{" "}
                </Link>
                &nbsp;&nbsp;
                <Link
                  to="/listusers"
                  className="btn btn-outline-secondary my-2 my-sm-0"
                >
                  Listar usuario{" "}
                </Link>
                &nbsp;&nbsp;
                <Link
                  to="/editarusuario"
                  className="btn btn-outline-secondary my-2 my-sm-0"
                >
                  Editar perfil{" "}
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  onClick={handleLogout}
                  type="submit"
                >
                  Cerrar sesión{" "}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary my-2 my-sm-0"
                >
                  Iniciar sesión{" "}
                </Link>
                &nbsp;&nbsp;
                <Link
                  to="/register"
                  className="btn btn-outline-info my-2 my-sm-0"
                >
                  Registrarse{" "}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MenuBar;
