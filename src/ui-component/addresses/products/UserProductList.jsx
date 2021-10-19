// React
import * as React from 'react';
import { Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { push } from "redux-first-history";

// Actions
import {
    getAllProductAction,
    deleteProductAction
} from "../../../store/storeAddresses/store/reducer";

// Material UI
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
} from '@material-ui/core';
import Button from "@material-ui/core/Button";


// icons
import ReceiptIcon from '@mui/icons-material/Receipt';


// Define styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        position: 'relative',
        top: '-55rem',
        left: '2.4rem',
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: '95%',
        height: '90%'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        //backgroundColor: theme.palette.primary.dark,
        //backgroundColor: '#EA3A72',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
}));


// Component Order List
const UserProductList = () => {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Get orders from store
    const orders = useSelector((state) => state.ui.orders)


    // Get current user
    const user = useSelector(((state) => state.login.usuario.user))


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Get products from the store
    const products = useSelector((state) => state.ui.products)

    //  Proucts by current user
    let userProducts = []
    products.map((product) => {
        if (product.user.id == user._id) {
            userProducts.push(product)
        }
    })

    console.log('ALL PRODUCTS BY USERS', products)
    console.log('PRODUCTS BY CURRENT USER', userProducts)





    // Delete one product
    const handleDelete = (event) => {
        event.preventDefault();
        const data = {}
        dispatch(deleteProductAction(data))
        dispatch(getAllProductAction())
    };

    // Actualizar la lista
    React.useEffect(() => {
        /* 
            if (!userProducts.length) dispatch(getAllProductAction());  
            Estono funciona para llenar userProducts cada vez que hay un cambio, solo llena userProducts cuando  está vacia :v
        */
        dispatch(getAllProductAction());
    }, [dispatch]);


    return (
        <>
            {/* User rol client */}
            {user.rol === 'cliente' && (
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Owner</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Features</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Company</TableCell>
                                <TableCell className={classes.tableHeaderCell}>ValueCU</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Edit</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userProducts.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{product.nombre}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{product.descripcion}</TableCell>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{product.user.name}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>{product.caracteristicas}</TableCell>
                                    <TableCell>{product.empresa}</TableCell>
                                    <TableCell>{product.valorCU}</TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/editarproducto/${product._id}`}
                                            variant="contained"
                                            color="secondary"
                                        >
                                            Edit {" "}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={handleDelete}
                                            variant="contained"
                                            color="secondary"
                                            className="btn btn-outline-danger my-2 my-sm-0"
                                        >
                                            Delete
                                    </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}

export default UserProductList;


