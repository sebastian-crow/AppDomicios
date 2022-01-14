// React
import React, { useRef, useEffect, useState, useCallback } from "react";

// Mdbreact
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";

import { Alert } from "react-bootstrap";

// React Bootstrap
import { Button } from "react-bootstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { registerAction } from "../../../store/reducer";

const SignUp = (props) => {
  const error = useSelector((state) => state.login.errorRegistro);
  const name = useFormInput("");
  const lastName = useFormInput("");
  const typeDocument = useFormInput("cc");
  const documentNumber = useFormInput("");
  const password = useFormInput("");
  const bornDate = useFormInput("");
  const email = useFormInput("");
  const dispatch = useDispatch();
  const handleRegister = (event) => {
    event.preventDefault();
    let data = {
      name: name.value,
      lastName: lastName.value,
      typeDocument: typeDocument.value,
      documentNumber: documentNumber.value,
      email: email.value,
      password: password.value,
      bornDate: bornDate.value,
    };
    dispatch(registerAction(data));
  };

  return (
    <>
      <div className="register-content">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form autoComplete="off" onSubmit={handleRegister}>
                <p className="h4 text-center mb-4">Registrarse</p>
                <label
                  htmlFor="defaultFormRegisterNameEx"
                  className="grey-text"
                >
                  Tú name
                </label>
                <input
                  type="text"
                  required
                  id="name"
                  name="name"
                  {...name}
                  className="form-control"
                />
                <br />
                <label
                  htmlFor="defaultFormRegisterNameEx"
                  className="grey-text"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  required
                  id="lastName"
                  name="lastName"
                  {...lastName}
                  autoComplete="lastName"
                  className="form-control"
                />
                 <br />
                <label
                  htmlFor="defaultFormRegisterEmailEx"
                  className="grey-text"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  {...email}
                  className="form-control"
                />
                <br />
                <label
                  htmlFor="defaultFormRegisterEmailEx"
                  className="grey-text"
                >
                  Documento Identidad
                </label>
                <input
                  type="documentNumber"
                  name="documentNumber"
                  id="documentNumber"
                  autoComplete="documentNumber"
                  {...documentNumber}
                  className="form-control"
                />
                <br />
                <br />
                <label
                  htmlFor="defaultFormRegisterPasswordEx"
                  className="grey-text"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  label="Contraseña"
                  id="password"
                  autoComplete="current-password"
                  {...password}
                  id="defaultFormRegisterPasswordEx"
                  className="form-control"
                />
                <br />
                <label
                  htmlFor="defaultFormRegisterPasswordEx"
                  className="grey-text"
                >
                  Fecha De bornDate
                </label>
                <input
                  type="date"
                  label="Fecha Nacimiento"
                  required
                  defaultValue="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...bornDate}
                  className="form-control"
                />
                <div className="text-center mt-4">
                  <Button variant="secondary btn-block" type="submit">
                    Registrarse
                  </Button>
                  {error && <Alert variant="danger">{error}</Alert>}
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <style jsx>{`
        .register-content {
          position: absolute;
          right: 13%;
          width: 50%;
        }
      `}</style>
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
