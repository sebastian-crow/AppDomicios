import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, buscarRestaurantesAction } from "../../store/reducer";
import { push } from "redux-first-history";

const useFormInput = (initialValue) => {
  const [value, setValue] = React.useState(initialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

const MenuBar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.usuario.token);
  const ciudad = useFormInput("");
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(push("/login"));
  };
  const handleFind = (event) => {
    event.preventDefault();
    dispatch(buscarRestaurantesAction(ciudad));
    dispatch(push("/"));
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
          &nbsp;&nbsp;
          <form onSubmit={handleFind} className="form-inline mt-1 mt-md-0">
            <input
              className="form-control mr-sm-1"
              type="text"
              placeholder="Nombre de ciudad"
              aria-label="Nombre de ciudad"
              {...ciudad}
              onSubmit={handleFind}
            />
            <button
              className="btn btn-outline-success my-1 my-sm-0"
              onClick={handleFind}
              type="submit"
            >
              Buscar
            </button>
          </form>
          <div style={{ display: "flex", marginLeft: "auto"}}>
            &nbsp;&nbsp;
            {token ? (
              <>
                <Link
                  to="/historial"
                  className="btn btn-outline-info my-2 my-sm-0"
                >
                  Hisotrial de busquedas{" "}
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
