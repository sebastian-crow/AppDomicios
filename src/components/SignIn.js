import React from "react";

//import '../styles/SignIn.css'


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


export default class SignIn extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            validateName: '',
            validatePassword: '',
            authenticated: false
        }
    }

    getUser = async (event) => {
        event.preventDefault()
        alert(`Your name is "${this.state.userName}" and your password is "${this.state.password}"`)

        const validateUser = {
            username: this.state.userName,
            password: this.state.password
        }

        setTimeout(async () => {
            await fetch('http://localhost:4036/api/auth', {
                method: 'POST',
                body: JSON.stringify(validateUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
                .then((json) => {
                    //console.log(json)
                    //const validateUser = json.message[0]
                    this.setState({
                        authenticated: true
                    })
                })
                .catch(e => console.log(e))
        }, 1000)

       
    }

    compareUserInfo = (event) => {
        event.preventDefault()
        // Consultar en la base de datos la existencia del usuario
        // Hacer validación en el API y traer los datos al front filtrando solo la información necesaria
        // Si existe y dependiendo el rol mostrare una vista diferente
    }



    submitHandler = (event) => {
        // Cuando se dispare el evento submit necesito consultar al API la información ingresada por el usuario
        // Crear un validador para habilitar el acceso al App para quien tiene una cuenta
        // Primero veamos que si se almacena la info del usuario en el state del componente antes de hacer la peticion para validar la información y permitir el ingreso
        event.preventDefault()
        let password = this.state.password
        if (password.length <= 8) {
            alert(`Your password is ""${password}"", and it need to have more than 8 characters`)
        } else {
            alert('Your password have more than 8 characters')
        }
    }


    changeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({ [nam]: val })
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
                <h1 id="validation"></h1>
                <button
                    onClick={this.getUser}
                    className="sub"
                >
                    Sign In
                </button>
                <style jsx>{`
                .sub {
                    background: none;
                    padding: 16px 32px;
                    text-decoration: none;
                    margin: 4px 2px;
                    cursor: pointer;

                    position: absolute;
                    width: 403.99px;
                    height: 72.22px;
                    left: 10rem;
                    top: 21rem;
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
                
                `}</style>
            </div>

        )
    }

}