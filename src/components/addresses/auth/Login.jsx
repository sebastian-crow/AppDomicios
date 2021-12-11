// React
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// React Bootstrap
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { MDBBtn } from "mdbreact";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducer
import { loginAction } from "../../../store/reducer";

// Login Page Component
const LoginPage = () => {
  const dispatch = useDispatch();
  const [documentoIdentidad, setDocumentoIdentidad] = useState(null);
  const [password, setPassword] = useState(null);
  const error = useSelector((state) => state.login.errorInicio);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginAction({ documentoIdentidad, password }));
  };

  const handleChangeEmail = (event) => {
    setDocumentoIdentidad(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded"></h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form autoComplete="on" onSubmit={handleLogin}>
              <Form.Group>
                <Form.Label>Documento Identidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tú Documento"
                  id="documentoIdentidad"
                  name="documentoIdentidad"
                  onChange={handleChangeEmail}
                  autoFocus
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  onChange={handleChangePassword}
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button variant="secondary btn-block" type="submit">
                Iniciar Sesión
              </Button>

              <Button
                variant="secondary btn-block"
                type="submit"
                onClick={() => dispatch(push(`/register`))}
              >
                Registrarse
              </Button>
            </Form>
          </Col>
        </Row>
        <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 Raven Designs For Dummies. All Rights Reserved.
        </h6>
      </Container>
    </>
  );
};

export default LoginPage;
