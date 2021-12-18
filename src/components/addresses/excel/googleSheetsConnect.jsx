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
export const GoogleSheetsConnect = (props) => {
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state.login.usuario.user);
  const [error, setError] = useState(null);
  const [googleSheets, setGoogleSheets] = useState(null);

  // Hanlde evnet onChange to Email
  const handleGoogleSheetsChange = (googleSheetsData) => {
    setGoogleSheets(googleSheetsData.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setError(null);
    let data = {
      googleSheets: googleSheets,
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
                    onChange={handleGoogleSheetsChange}
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
                <div className="sheetBsRePosition">
                  <Button variant="success" size="lg" type="submit">
                    <a
                      href="https://sheet.best/"
                      target="_blank"
                      className="aLink"
                    >
                      Ir a Sheet.bes
                    </a>
                  </Button>{" "}
                  {``}
                </div>
              </FormGroup>
            </Col>
            <Col></Col>
          </Form>
        </Container>
      </div>
      <style jsx>{`
        .aLink {
          text-decoration: none;
          color: white;
        }

        .aLink:hover {
          color: white;
        }

        .sheetBsRePosition {
          position: absolute;
          left: 13rem;
          top: -5.1rem;
        }
      `}</style>
    </>
  );
};
