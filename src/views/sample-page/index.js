import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// Header
import MainLayout from '../../layout/MainLayout'

//= =============================|| SAMPLE PAGE ||==============================//


import { useDispatch, useSelector } from "react-redux";


// Product List
import ListProducts from 'ui-component/addresses/products/ListProducts'

//<Link to="/mapbox">mapbox</Link>
const SamplePage = () => {


    return (
        <>
            <MainLayout />

            <ListProducts />
        </>
    )
}
export default SamplePage;