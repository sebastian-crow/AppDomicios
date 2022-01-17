// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'redux-first-history';

// Reducers
import { actualizarUsuarioAction } from '../../../store/reducer';

// Reacstrap
import {
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

// Take Order Component
export const GoogleSheetsConnect = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const [error, setError] = useState(null);
  const [googleSheets, setGoogleSheets] = useState(user.googleSheets);

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
    dispatch(actualizarUsuarioAction(data));
    dispatch(push('/'));
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
                    defaultValue={user.googleSheets}
                    placeholder="Agrega tu link de sheet.bes para conectar tu perfil con tu cuenta de google sheets"
                    onChange={handleGoogleSheetsChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="">
                <div className="">
                  <Button variant="success" size="lg" type="submit">
                    Guardar
                  </Button>{' '}
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
                  </Button>{' '}
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
