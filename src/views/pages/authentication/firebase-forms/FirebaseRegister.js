import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


// Actions
import { registerAction } from "../../../../store/storeAddresses/store/reducer";

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
    Select,
    MenuItem,
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: `${theme.palette.grey[100]} !important`,
        color: `${theme.palette.grey[900]}!important`,
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));


//= ==========================|| FIREBASE - REGISTER ||===========================//

const FirebaseRegister = ({ ...others }) => {
    const classes = useStyles();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const customization = useSelector((state) => state.customization);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const googleHandler = async () => {
        console.error('Register');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);


    // Own Config
    const error = useSelector((state) => state.login.errorRegistro)
    const nombre = useFormInput("")
    const apellido = useFormInput("")
    const tipoDocumento = useFormInput("Cedula");
    const documentoIdentidad = useFormInput("");
    const password = useFormInput("");
    const fechaNacimiento = useFormInput("")

    const dispatch = useDispatch();

    const handleRegister = (event) => {
        event.preventDefault();
        let data = {
            nombre: nombre.value,
            apellido: apellido.value,
            tipoDocumento: tipoDocumento.value,
            documentoIdentidad: documentoIdentidad.value,
            password: password.value,
            fechaNacimiento: fechaNacimiento.value,
        };
        dispatch(registerAction(data));
    };

    // Proof consoles log
    console.log('NOMBRE', nombre)
    console.log('APELLIDO', apellido)
    console.log('Documento tipo', tipoDocumento)
    console.log('DOCUMENTO IDENTIDAD', documentoIdentidad)
    console.log('PASSWORD', password)
    console.log('FECHA_NACIMIENTO', fechaNacimiento)

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>

                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                nitialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleRegister} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    type="text"
                                    id="nombre"
                                    type="text"
                                    name="nombre"
                                    autoComplete="current-nombre"
                                    {...nombre}
                                    defaultValue="nombre"
                                    className={classes.loginInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    id="apellido"
                                    type="text"
                                    name="apellido"
                                    autoComplete="current-apellido"
                                    {...apellido}
                                    defaultValue="Last Name"
                                    className={classes.loginInput}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel name="tipo" id="tipo">
                                    Tipo de documento
                                    </InputLabel>
                                <Select required labelId="tipo" {...tipoDocumento}>
                                    <MenuItem value="Cedula" selected>
                                        Cedula
                                    </MenuItem>
                                    <MenuItem value="TargetaIdentidad">
                                        Targeta de identidad
                                    </MenuItem>
                                    <MenuItem value="pasaporte">Pasaporte</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} className="documentNumber">
                                <TextField
                                    fullWidth
                                    label="Document Number"
                                    margin="normal"
                                    id="documentoIdentidad"
                                    type="text"
                                    name="documentoIdentidad"
                                    autoComplete="current-documentoIdentidad"
                                    {...documentoIdentidad}
                                    defaultValue="Document Number"
                                    className={classes.loginInput}
                                />
                            </Grid>
                        </Grid>

                        <FormControl fullWidth className={classes.loginInput}>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Cumpleaños"
                                    type="date"
                                    required
                                    defaultValue="2017-05-24"
                                    className={classes.loginInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...fechaNacimiento}
                                />
                            </Grid>
                        </FormControl>



                        <FormControl fullWidth className={classes.loginInput}>
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                                {...password}
                                name="password"
                                label="Password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box
                                    sx={{
                                        mb: 2
                                    }}
                                >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                backgroundColor={level.color}
                                                sx={{
                                                    width: 85,
                                                    height: 8,
                                                    borderRadius: '7px'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
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




export default FirebaseRegister;
