// React
import React, { useState } from 'react';

import {
  Container,
  Button,
  Form,
  Alert,
  Label,
  FormGroup,
  Input,
  FormFeedback,
} from 'reactstrap';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// Reducers
import { registerAction } from '../../../store/reducer';

const SignUp = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.login.errorRegistro);
  const [formIsValid, setFormIsValid] = React.useState(false);

  // Component State
  const [name, setName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [documentNumber, setDocumentNumber] = React.useState(null);
  const [typeDocument, setTypeDocument] = React.useState({
    value: 'cc',
    label: 'Cedula',
  });
  const [password, setPassword] = React.useState(null);
  const [bornDate, setBorndate] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [role, setRole] = React.useState({
    value: 'client',
    label: 'Cliente',
  });

  // Handle Register
  const handleRegister = (event) => {
    event.preventDefault();
    let data = {
      name: name,
      lastName: lastName,
      typeDocument: typeDocument.value,
      documentNumber: documentNumber,
      email: email,
      role: role.value,
      password: password,
      bornDate: bornDate,
      address: address,
    };
    dispatch(registerAction(data));
  };

  // Manejadores de eventos para intercatuar con el estado del componente
  const handleEmailChange = (email) => {
    setEmail(email.target.value);
  };

  const handlePasswordChange = (password) => {
    setPassword(password.target.value);
  };

  const handleNameChange = (name) => {
    setName(name.target.value);
  };

  const handleLasNameChange = (lastName) => {
    setLastName(lastName.target.value);
  };

  const handleDocumentNumber = (documentNumber) => {
    setDocumentNumber(documentNumber.target.value);
  };

  const handleTypeDocument = (role) => {
    setTypeDocument(role);
  };

  const handleBornDate = (bornDate) => {
    setBorndate(bornDate.target.value);
  };

  const handleRole = (role) => {
    setRole(role);
  };

  const handleAddressChange = (address) => {
    setAddress(address.target.value);
  };

  React.useEffect(() => {
    if (
      formIsValid === false &&
      Object.keys(typeDocument).length &&
      Object.keys(role).length
    ) {
      setFormIsValid(true);
    }
  }, [setFormIsValid, formIsValid, typeDocument]);
  return (
    <>
      <Container>
        <br />
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label for="examplePassword">Nombre</Label>
            <Input
              type="text"
              required
              id="name"
              name="name"
              className="form-control"
              onChange={handleNameChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Apellido</Label>
            <Input
              type="text"
              required
              id="lastName"
              name="lastName"
              autoComplete="lastName"
              className="form-control"
              onChange={handleLasNameChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">Correo</Label>
            <Input
              type="text"
              placeholder="Ingresa tú Correo"
              id="email"
              name="email"
              required
              onChange={handleEmailChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Tipo de documento</Label>
            {role.value === 'company' && (
              <>
                <br />
                <Label for="examplePassword">
                  El tipo de documento para el registro como empresa
                  debe ser NIT
                </Label>
              </>
            )}
            <Select
              onChange={handleTypeDocument}
              value={typeDocument}
              placeholder="Tipo de documento"
              options={[
                {
                  value: 'cc',
                  label: 'Cedula',
                },
                {
                  value: 'nit',
                  label: 'NIT',
                },
              ]}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Numero de documento</Label>
            <Input
              type="number"
              name="documentNumber"
              id="documentNumber"
              autoComplete="documentNumber"
              required
              className="form-control"
              onChange={handleDocumentNumber}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Fecha de nacimiento</Label>
            <Input
              type="date"
              required
              className="form-control"
              onChange={handleBornDate}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            <Input
              type="password"
              placeholder="Contraseña"
              id="password"
              name="password"
              required
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Dirección</Label>
            <Input
              type="address"
              placeholder="Dirección"
              id="address"
              name="address"
              required
              onChange={handleAddressChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Tipo de usuario</Label>
            <Select
              onChange={handleRole}
              value={role}
              placeholder="Rol"
              options={[
                {
                  value: 'client',
                  label: 'Cliente',
                },
                {
                  value: 'domiciliary',
                  label: 'Domiciliario',
                },
                {
                  value: 'company',
                  label: 'Empresa',
                },
              ]}
            />
          </FormGroup>
          <Button
            variant="secondary btn-block"
            type="submit"
            disabled={!formIsValid}
          >
            Registrar
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      </Container>
    </>
  );
};

export default SignUp;
