// React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import { actualizarUsuarioAction } from "../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input } from "reactstrap";

// React Bootstrap
import { Button } from "react-bootstrap";

// Moment
import moment from "moment";

// Take Order Component
const EditarUsuario = (props) => {
  const dispatch = useDispatch();

  const password = useFormInput("");
  const usuario = useSelector((state) => state.login.usuario.user);
  const nombre = useFormInput(usuario.nombre);
  const apellido = useFormInput(usuario.apellido);
  const tipoDocumento = useFormInput(usuario.tipoDocumento);
  const documentoIdentidad = useFormInput(usuario.documentoIdentidad);
  const fechaNacimiento = useFormInput(
    moment(usuario.fechaNacimiento).format("YYYY-MM-DD")
  );
  const [error, setError] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      nombre: nombre.value,
      apellido: apellido.value,
      tipoDocumento: tipoDocumento.value,
      documentoIdentidad: documentoIdentidad.value,
      password: password.value,
      fechaNacimiento: fechaNacimiento.value,
      rol: "cliente",
    };
    dispatch(actualizarUsuarioAction({ data, id: usuario._id }));
    dispatch(push("/"));
  };

  return (
    <>
      <div>
        <Container className="themed-container" fluid="sm">
          <Form className="form" onSubmit={handleRegister}>
            <Col>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="nombre"
                    autofocus
                    defaultValue={usuario.nombre}
                    placeholder="Nombre del Usuario"
                    {...nombre}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="apellido"
                    placeholder="Apellido"
                    defaultValue={usuario.apellido}
                    {...apellido}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="tipo"
                    placeholder="Tipo de Documento"
                    {...tipoDocumento}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="documentoIdentidad"
                    placeholder="Documento de Identidad"
                    name="documentoIdentidad"
                    defaultValue={usuario.documentoIdentidad}
                    {...documentoIdentidad}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    {...password}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="date"
                    id="date"
                    inputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={moment(usuario.fechaNacimiento).format(
                      "YYYY-MM-DD"
                    )}
                    placeholder="Fecha Nacimiento"
                    {...fechaNacimiento}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="">
                <div className="">
                  <Button variant="success" size="lg" type="submit">
                    Guardar
                  </Button>{" "}
                  {``}
                </div>
              </FormGroup>
              <FormGroup className="">
                <div className="">
                  <Button variant="success" size="lg" type="submit">
                    <Link to={`/cliente/takeorder/${1}`}>Take Order</Link>
                  </Button>{" "}
                  {``}
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
        </Container>
      </div>
    </>
  );
};

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default EditarUsuario;
