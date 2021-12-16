// React
import React, { useEffect, useState } from "react";

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
export const GoogleSheetsConnect = (props) => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.login.usuario.user);
  const googleSheets = useFormInput("");
  const [error, setError] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      googleSheets: googleSheets.value,
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
                    id="sheet.besUrl"
                    autofocus
                    placeholder="Agrega tu link de sheet.bes para conectar tu perfil con tu cuenta de google sheets"
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
