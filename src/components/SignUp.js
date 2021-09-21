//import { render } from "@testing-library/react";
import React from "react";
import axios from 'axios'



const SignUpStyles = {
    main: {
        position: 'absolute',
        width: '717.97px',
        height: '650px',
        left: '32rem',
        top: '6rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '14px'
    },

    title: {
        position: 'relative',
        width: '315px',
        height: '58px',
        left: '14rem',
        top: '0.2rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': '500',
        'font-size': '48px',
        'line-height': '58px',

        color: '#000000'

    },

    inputName: {
        position: 'absolute',
        width: '340px',
        height: '51px',
        left: '15rem',
        top: '8.5rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '10px'
    },

    textName: {
        position: 'absolute',
        width: '94px',
        height: '41px',
        left: '7rem',
        top: '8.5rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': 'normal',
        'font-size': '34px',
        'line-height': '41px',

        color: '#000000'

    },


    inputPassword: {
        position: 'absolute',
        width: '340px',
        height: '51px',
        left: '15rem',
        top: '20rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '10px'
    },

    textPassword: {
        position: 'absolute',
        width: '149px',
        height: '41px',
        left: '6rem',
        top: '20rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': 'normal',
        'font-size': '34px',
        'line-height': '41px',

        color: '#000000'

    },

    inputConfirmPassword: {
        position: 'absolute',
        width: '340px',
        height: '51px',
        left: '15rem',
        top: '26.5rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '10px'
    },

    textConfirmPassword: {
        position: 'absolute',
        width: '149px',
        height: '41px',
        left: '6rem',
        top: '26rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': 'normal',
        'font-size': '34px',
        'line-height': '41px',

        color: '#000000'

    },

    inputAddress: {
        position: 'absolute',
        width: '340px',
        height: '51px',
        left: '15rem',
        top: '14rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '10px'
    },

    textAddress: {
        position: 'absolute',
        width: '149px',
        height: '41px',
        left: '6rem',
        top: '14rem',

        'font-family': `'Oswald', sans-serif`,
        'font-style': 'normal',
        'font-weight': 'normal',
        'font-size': '34px',
        'line-height': '41px',

        color: '#000000'

    },

}


export default class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            address: '',
            password: '',
        }
    }


    submitHandler = (event) => {
        event.preventDefault()
        alert('Everythin os')

        /*
        let password = this.state.password

        if(password.length <= 8) {
            alert(`Your password is ""${password}"", and it need to have more than 8 characters`)
        } else {
            alert('Your password have more than 8 characters')
        }
        */

        const newUser = {
            name: this.state.userName,
            address: this.state.address,
            password: this.state.password,
            rol: {
                client: true
            }
        }
        const API_URL = 'http://localhost:4036/api/users'
        axios.post(API_URL, newUser)
            .then(response => response.data)
            .catch(err => err)
    }

    changeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({ [nam]: val })
    }

    validateSamePassword = async (event) => {
        const responsee = document.getElementById('res')

        if (event.target.name === 'confirmPassword') {
            let val_passowrd = await event.target.value
            if (val_passowrd === this.state.password) {
                responsee.style.color = "green"
                responsee.innerHTML = "<h1>Passwords Matches</h1>"
            } else {
                responsee.style.color = "red"
                responsee.innerHTML = "<h1>Write your password again</h1>"
            }
        }
    }

    render() {
        const main = Object.assign({}, SignUpStyles.main)
        const title = Object.assign({}, SignUpStyles.title)

        const textName = Object.assign({}, SignUpStyles.textName)
        const inputName = Object.assign({}, SignUpStyles.inputName)

        const textPassword = Object.assign({}, SignUpStyles.textPassword)
        const inputPassword = Object.assign({}, SignUpStyles.inputPassword)

        const inputAddress = Object.assign({}, SignUpStyles.inputAddress)
        const textAddress = Object.assign({}, SignUpStyles.textAddress)

        const textConfirmPassword = Object.assign({}, SignUpStyles.textConfirmPassword)
        const inputConfirmPassword = Object.assign({}, SignUpStyles.inputConfirmPassword)


        return (
            <div style={main}>
                <h1 style={title}>Addresses App</h1>
                <form onSubmit={this.submitHandler}>

                    <label style={textName}>
                        Name
                    </label>
                    <input
                        type="text"
                        name="userName"
                        style={inputName}
                        onChange={this.changeHandler}
                    />

                    <label style={textAddress}>
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        style={inputAddress}
                        onChange={this.changeHandler}
                    />

                    <label style={textPassword}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        style={inputPassword}
                        onChange={this.changeHandler}
                    />

                    <label style={textConfirmPassword}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        style={inputConfirmPassword}
                        onChange={this.validateSamePassword}
                    />
                    <input
                        type="submit"
                        className="sub"
                        value="Sign Up"
                    />
                    <h1 id="res"></h1>
                </form>

                <style jsx>{`
                
                    input[type=submit] {
                        background: none;
                        padding: 16px 32px;
                        text-decoration: none;
                        margin: 4px 2px;
                        cursor: pointer;

                        position: relative;
                        width: 403.99px;
                        height: 72.22px;
                        left: 10rem;
                        top: 25.5rem;
                        border: 2px solid #000000;
                        box-sizing: border-box;
                        border-radius: 14px;

                        font-family: 'Oswald', sans-serif;
                        font-style: normal;
                        font-weight: 500;
                        font-size: 2rem;        
                        letter-spacing: 3px;
                        line-height: 30px;
                        color: #000000;
                        
                    }

                        #res{
                            position: relative;
                            width: 20rem;
                            top: 16.5rem;
                            left: 18rem;

                            font-size: 0.6rem;
                        }
               `}</style>
            </div>


        )
    }

}
