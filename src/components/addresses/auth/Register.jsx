// React
import React, { useState } from "react";

import { Container, Button, Form, Alert, Label, FormGroup, Input } from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

// Reducers
import { registerAction } from "../../../store/reducer";

const SignUp = () => {
  const error = useSelector((state) => state.login.errorRegistro);
  const name = useFormInput("");
  const lastName = useFormInput("");
  const documentNumber = useFormInput("");
  const [typeDocument, setTypeDocument] = React.useState("cc");
  const password = useFormInput("");
  const bornDate = useFormInput("");
  const email = useFormInput("");
  const [rol, setRol] = React.useState("client");
  const dispatch = useDispatch();
  const handleRegister = (event) => {
    event.preventDefault();
    let data = {
      name: name.value,
      lastName: lastName.value,
      typeDocument: typeDocument.value,
      documentNumber: documentNumber.value,
      email: email.value,
      rol: rol.value,
      password: password.value,
      bornDate: bornDate.value,
    };
    dispatch(registerAction(data));
  };
  const handleRol = (role) => {
    setRol(role);
  };
  const handleTypeDocument = (role) => {
    setTypeDocument(role);
  };

  return (
    <>
      <Container>
        <br />
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label for="exampleEmail">Correo</Label>
            <Input
              type="text"
              placeholder="Ingresa tú Correo"
              id="email"
              name="email"
              {...email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            <Input
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
              {...password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Nombre</Label>
            <Input
              type="text"
              required
              id="name"
              name="name"
              {...name}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Apellido</Label>
            <Input
              type="text"
              required
              id="lastName"
              name="lastName"
              {...lastName}
              autoComplete="lastName"
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Numero de documento</Label>
            <Input
              type="documentNumber"
              name="documentNumber"
              id="documentNumber"
              autoComplete="documentNumber"
              {...documentNumber}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Tipo de documento</Label>
            <Select
              onChange={handleTypeDocument}
              value={typeDocument}
              placeholder="Tipo de documento"
              options={[
                {
                  value: "cc",
                  label: "Cedula",
                },
                {
                  value: "nit",
                  label: "NIT",
                },
              ]}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Fecha de nacimiento</Label>
            <Input
              type="date"
              required
              {...bornDate}
              className="form-control"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Tipo de usuario</Label>
            <Select
              onChange={handleRol}
              value={rol}
              placeholder="Rol"
              options={[
                {
                  value: "client",
                  label: "Cliente",
                },
                {
                  value: "domiciliary",
                  label: "Domiciliario",
                },
              ]}
            />
          </FormGroup>
          <Button variant="secondary btn-block" type="submit">
            Registrar
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </Container>
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

export default SignUp;
