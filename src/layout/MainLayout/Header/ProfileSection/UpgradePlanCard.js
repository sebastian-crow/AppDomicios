import React from 'react';
import { Link } from "react-router-dom";
import { push } from "redux-first-history";


// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@material-ui/core';


// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch } from 'react-redux';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.warning.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '19px solid ',
            borderColor: theme.palette.warning.main,
            borderRadius: '50%',
            top: '65px',
            right: '-150px'
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '200px',
            height: '200px',
            border: '3px solid ',
            borderColor: theme.palette.warning.main,
            borderRadius: '50%',
            top: '145px',
            right: '-70px'
        }
    },
    tagLine: {
        color: theme.palette.grey[900],
        opacity: 0.6
    },
    button: {
        color: theme.palette.grey[800],
        backgroundColor: theme.palette.warning.main,
        textTransform: 'capitalize',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: theme.palette.warning.dark
        }
    }
}));

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const UpgradePlanCard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h4">Edit your profile</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" className={classes.tagLine}>
                                Edit your name, document, email <br />
                            and password
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Stack direction="row">
                                <AnimateButton>
                                    <Button variant="contained" className={classes.button}>
                                        <Link className="link" to="/editarusuario">
                                            Edit
                                    </Link>
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <style jsx>{`
                .link {
                    text-decoration: none
                }
        `}</style>
        </>
    );
};

export default UpgradePlanCard;
