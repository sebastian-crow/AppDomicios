// React
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Actions
import {
  updateProductAction,
  createProductAction,
  getAllProductAction,
} from "../../../store/reducer";

// Antd
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import Icon from "@ant-design/icons";

// Excel Renderer React
import { ExcelRenderer } from "react-excel-renderer";

// Utils
import { EditableFormRow, EditableCell } from "./utils/editable";

// CSS
import "antd/dist/antd.css";

// Excel Componenet
export const Excel = () => {
  // Dispatch
  const dispatch = useDispatch();

  // Products
  const products = useSelector((state) => state.ui.products);

  // Current User
  const user = useSelector((state) => state.login.usuario.user);
  console.log("current user", user);

  // Componenet State
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [count, setCount] = useState(0);

  // Columns
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      editable: true,
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      editable: true,
    },
    {
      title: "Variedades",
      dataIndex: "variedades",
      editable: true,
    },
    {
      title: "Precio",
      dataIndex: "precio",
      editable: true,
    },
    {
      title: "Precio Anterior",
      dataIndex: "precioAnterior",
      editable: true,
    },
    {
      title: "Ocultar",
      dataIndex: "ocultar",
      editable: true,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      editable: true,
    },
    {
      title: "Tamaño Imagen",
      dataIndex: "tamañoImagen",
      editable: true,
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      editable: true,
    },
    {
      title: "Imagen 2",
      dataIndex: "imagenDos",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        rows.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Icon
              type="delete"
              theme="filled"
              style={{ color: "red", fontSize: "20px" }}
            />
          </Popconfirm>
        ) : null,
    },
  ];

  // Save new rows
  const handleSave = (row) => {
    const newData = rows;
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setRows(newData);
  };

  // Check file and type of data
  const checkFile = (file) => {
    let errorMessage = "";
    if (!file || !file[0]) return;
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!!";
    }
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("ErrorMessage", errorMessage);
    return errorMessage;
  };

  const fileHandler = (fileList) => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      setErrorMessage("No file uploaded");
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      setErrorMessage("Unknown file format. Only Excel files are uploaded!");
      return false;
    }

    // Just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              nombre: row[0],
              descripcion: row[1],
              variedades: row[2],
              precio: row[3],
              precioAnterior: row[4],
              ocultar: row[5],
              categoria: row[6],
              tamañoImagen: row[7],
              imagen: row[8],
              imagenDos: row[9],
            });
          }
        });
        if (newRows.length === 0) {
          setErrorMessage("No data found in file!");
          return false;
        } else {
          setCols(resp.cols);
          console.log(newRows);
          setRows(newRows);
          setErrorMessage(null);
        }
      }
    });
    return false;
  };

  const handleSubmit = async () => {
    const data = rows;
    console.log("Data to send", data);
    console.log("Products", products);

    const newData = data.map((dat) => {
      /*
         Comprobate if in this data info there are more than 2 images
         
         Get the category id, comprobate if the category inside the 
         data info exits if yes don't make nothing and get their id 
         for associate with this new product that will be created, 
        if not create a new category with the name name that are in the
        field category within this newData. For this I need to comprobotate
        every data category for know if exists.
      */
      return {
        nombre: dat.nombre,
        descripcion: dat.descripcion,
        variedades: dat.variedades,
        precio: {
          precioAnterior: dat.precioAnterior,
          precioActual: dat.precio,
        },
        ocultar: dat.ocultar,
        categoria: {
          id: 8784818,
          nombre: dat.categoria,
        },
        imagen: {
          0: {
            url: dat.imagen,
            size: dat.tamañoImagen,
          },
          1: {
            url: dat.imagenDos,
            size: dat.tamañoImagen,
          },
        },
        user: {
          nombre: user.nombre,
          id: user._id,
        },
      };
    });

    newData.map((data) => {
      products.map((product) => {
        if (product._id === data._id) {
          dispatch(updateProductAction(data));
          console.log("Product Updated Succesfully!");
        } else {
          dispatch(createProductAction(data));
          console.log("Product Created Succesfuly");
        }
      });
    });
    // Submit to API
    // If successful, banigate and clear the data
    // setRows([])
  };

  // Delete one Row
  const handleDelete = (key) => {
    const rows = [...rows];
    setRows(rows.filer((item) => item.key !== key));
  };

  // Add One Row
  const handleAdd = () => {
    const newData = {
      key: count,
      nombre: "",
      descripcion: "",
      variedades: "",
      precio: "",
      precioAnterior: "",
      ocultar: "",
      categoria: "",
      tamañoImagen: "",
      imagen: "",
      imagenDos: "",
    };
    setRows([newData, ...rows]);
    setCount(count + 1);
    console.log("New data", newData);
  };

  useEffect(() => {
    dispatch(getAllProductAction());
  }, []);

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };
  const column = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <>
      <h1>Importar Datos De Excel</h1>
      <Row gutter={16}>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="page-title">Cargar Información</div>
          </div>
        </Col>
        <Col
          span={8}
          align="right"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {rows.length > 0 && (
            <>
              <Button
                onClick={handleAdd}
                size="large"
                type="info"
                style={{ marginBottom: 16 }}
              >
                <Icon type="plus" />
                Add a row
              </Button>{" "}
              <Button
                onClick={handleSubmit}
                size="large"
                type="primary"
                style={{ marginBottom: 16, marginLeft: 10 }}
              >
                Enviar Información
              </Button>
            </>
          )}
        </Col>
      </Row>
      <div>
        <Upload
          name="file"
          beforeUpload={fileHandler}
          onRemove={() => setRows([])}
          multiple={false}
        >
          <Button>
            <Icon type="upload" /> Cargar Información
          </Button>
        </Upload>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={rows}
          columns={column}
        />
      </div>
    </>
  );
};
