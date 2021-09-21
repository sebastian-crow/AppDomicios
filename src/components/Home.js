import React from "react";
import '../styles/Home.css'
import { Link } from "react-router-dom";

const homeStyles = {
    main: {
        position: 'absolute',
        width: '717.97px',
        height: '471.07px',
        left: '32rem',
        top: '10rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '14px'
    },

    title: {
        position: 'relative',
        width: '315px',
        height: '58px',
        left: '14rem',
        top: '3rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': '500',
        'font-size': '48px',
        'line-height': '58px',

        color: '#000000'

    },

    signin: {
        position: 'absolute',
        width: '167.98px',
        height: '72.22px',
        left: '8rem',
        top: '16rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '14px'
    },

    signup: {
        position: 'absolute',
        width: '167.98px',
        height: '72.22px',
        left: '26rem',
        top: '16rem',

        border: '2px solid #000000',
        'box-sizing': 'border- box',
        'border-radius': '14px',
    },

    signinText: {
        position: 'absolute',
        width: '76px',
        height: '30px',
        left: '3rem',
        top: '0.2rem',
        'text-decoration': 'none',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': '400',
        'font-size': '24px',
        'line-height': '30px',
        color: '#000000'
    },

    signupText: {
        position: 'absolute',
        width: '85px',
        height: '30px',
        left: '2.8rem',
        top: '0.2rem',
        'text-decoration': 'none',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': '400',
        'font-size': '24px',
        'line-height': '30px',
        color: '#000000'

    }
}

export default function Home() {

    const main = Object.assign({}, homeStyles.main)
    const title = Object.assign({}, homeStyles.title)
    const signup = Object.assign({}, homeStyles.signup)
    const signin = Object.assign({}, homeStyles.signin)
    const textSignup = Object.assign({}, homeStyles.signupText)
    const textSignin = Object.assign({}, homeStyles.signinText)

    return (
        <div style={main}>
            <h1 style={title}>Addresses App</h1>
            <Link to={"/signin"} style={signin}>
                <h1 style={textSignin}>Sign In</h1>
            </Link>
            <a href="/signup" style={signup}>
                <h1 style={textSignup}>Sign Up</h1>
            </a>
            <Link to={"/signup"} style={signup}>
                <h1 style={textSignup}>Sign Up</h1>
            </Link>
        </div>
    )
}


