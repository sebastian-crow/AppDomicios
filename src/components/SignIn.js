import React from "react";

import '../styles/SignIn.css'


const SignInStyles = {
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
        top: '14rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '10px'
    },

    textPassword: {
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

    }

}


export default class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
        }
    }


    submitHandler = (event) => {
        // Cuando se dispare el evento submit necesito consultar al API la información ingresada por el usuario
        // Crear un validador para habilitar el acceso al App para quien tiene una cuenta
        // Primero veamos que si se almacena la info del usuario en el state del componente antes de hacer la peticion para validar la información y permitir el ingreso
        event.preventDefault()
        let password = this.state.password
        if(password.length <= 8) {
            alert(`Your password is ""${password}"", and it need to have more than 8 characters`)
        } else {
            alert('Your password have more than 8 characters')
        }
    }


    changeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val})
    }


    render() {
        const main = Object.assign({}, SignInStyles.main)
        const title = Object.assign({}, SignInStyles.title)
        const textName = Object.assign({}, SignInStyles.textName)
        const inputName = Object.assign({}, SignInStyles.inputName)
        const textPassword = Object.assign({}, SignInStyles.textPassword)
        const inputPassword = Object.assign({}, SignInStyles.inputPassword)

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
                    <label style={textPassword}>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        style={inputPassword}
                        onChange={this.changeHandler}
                    />
                    <input 
                        type="submit"
                        value="Sign In"
                    />
                </form>

            </div>

        )
    }

}