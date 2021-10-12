// React
import React from 'react';
import { Link } from "react-router-dom";
// material-ui
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@material-ui/core';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// Preview Map
import { PreviewMap } from "../../../../ui-component/addresses/maps/mapbox/PreviewMap"

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        background: theme.palette.warning.light,
        marginTop: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
        height: '20rem',
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
            height: '600px',
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

const mapStyles = { // THIS CLASS NEEDS TO BE REPAIRED
    position: {
        position: 'relative',
        width: '100%',
        height: '100%',
    }
}

// ===========================|| PROFILE MENU - UPGRADE PLAN CARD ||=========================== //

const UpgradePlanCard = () => {
    const classes = useStyles();
    

    return (
        <>
            <Card className={classes.card} >
                <Grid container direction="column" spacing={2}>
                    <CardContent>
                        {/* <PreviewMap /> */}
                    </CardContent>
                </Grid>
            </Card>
            <style jsx>{`
                .mapBox {                
                    height: 600px;
                }
            `}</style>
        </>
    );
};

export default UpgradePlanCard;


/*



*/