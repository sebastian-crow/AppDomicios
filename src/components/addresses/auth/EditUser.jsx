// React
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Reducers
import { actualizarUsuarioAction } from "../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";

// Moment
import moment from "moment";

// Take Order Component
const EditUser = (props) => {
  const dispatch = useDispatch();

  const password = useFormInput("");
  const user = useSelector((state) => state.login.user);
  const name = useFormInput(user.name);
  const lastName = useFormInput(user.lastName);
  const typeDocument = useFormInput(user.typeDocument);
  const documentNumber = useFormInput(user.documentNumber);
  const bornDate = useFormInput(
    moment(user.bornDate).format("YYYY-MM-DD")
  );
  const [error, setError] = useState(null);

  const handleRegister = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      name: name.value,
      lastName: lastName.value,
      typeDocument: typeDocument.value,
      documentNumber: documentNumber.value,
      password: password.value,
      bornDate: bornDate.value,
      rol: "client",
    };
    dispatch(actualizarUsuarioAction({ data, id: user._id }));
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
                    id="name"
                    placeholder="Nombre del Usuario"
                    {...name}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Apellido"
                    {...lastName}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="tipo"
                    placeholder="Tipo de Documento"
                    {...typeDocument}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="documentNumber"
                    placeholder="Documento de Identidad"
                    name="documentNumber"
                    {...documentNumber}
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
                    placeholder="Fecha Nacimiento"
                    {...bornDate}
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

export default EditUser;
