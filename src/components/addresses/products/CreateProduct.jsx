// React
import * as React from "react";

// Redux
import { useDispatch, useSelector} from "react-redux";
import { push } from "redux-first-history";

// Reducers
import { createProductAction } from "../../../store/reducer";

// Reacstrap
import { Container, Col, Form, FormGroup, Input } from "reactstrap";

// React Bootstrap
import { Button } from "react-bootstrap";

// Take Order Component
const CreateProduct = (props) => {
  const dispatch = useDispatch();

  // Get Current User
  const user = useSelector((state) => state.login.user);

  const nombre = useFormInput("");
  const descripcion = useFormInput("");
  const caracteristicas = useFormInput("");
  const empresa = useFormInput("");
  const valorCU = useFormInput("");

  const handleCreate = (event) => {
    event.preventDefault();
    let data = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      caracteristicas: caracteristicas.value,
      empresa: empresa.value,
      valorCU: valorCU.value,
      user: {
        name: user.nombre,
        id: user._id,
      },
    };
    dispatch(createProductAction(data));
    if (user?.rol === "admin") {
      dispatch(push("/admin/userproductlist"));
    } else if (user?.rol === "cliente") {
      dispatch(push("/cliente/userproductlist"));
    }
  };

  return (
    <>
      <div>
        <Container className="themed-container" fluid="sm">
          <Form className="form">
            <Col>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="nombre"
                    placeholder="Nombre del producto"
                    {...nombre}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="descripcion"
                    placeholder="Descripción"
                    {...descripcion}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="empresa"
                    placeholder="Empresa"
                    {...empresa}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="caracteristicas"
                    placeholder="Caracteristicas"
                    {...caracteristicas}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Input
                    type="text"
                    id="valorCU"
                    placeholder="Valor CU"
                    {...valorCU}
                  />
                </Col>
              </FormGroup>
              <FormGroup className="">
                <div className="">
                  <Button variant="success" size="lg" onClick={handleCreate}>
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
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default CreateProduct;
