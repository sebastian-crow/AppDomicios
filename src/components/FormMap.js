import React from 'react';
//import ReactDOM from 'react-dom';
//import { useSelector, useDispatch } from 'react-redux';

//import CurrentLocation from './Map';

const formStyles = {
    form: {
        position: 'absolute',
        width: '433.75px',
        height: '466.25px',
        left: '794px',
        top: '178.49px',
        border: '3px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '14px'
    },

    name: {
        position: 'absolute',
        width: '64px',
        height: '28px',
        left: '2rem',
        top: '1rem',

        'font-family': 'Roboto',
        'font-style': 'normal',
        'font-weight': 'bold',
        'font-size': '24px',
        'line-height': '28px',
        color: '#000000'
    },

    address: {
        position: 'absolute',
        width: '90px',
        height: '28px',
        left: '2rem',
        top: '5.5rem',

        'font-family': 'Roboto',
        'font- style': 'normal',
        'font-weight': 'bold',
        'font-size': '24px',
        'line-height': '28px',
        color: '#000000'

    },

    current_location: {
        position: 'absolute',
        width: '172px',
        height: '28px',
        left: '2rem',
        top: '10rem',

        'font-family': 'Roboto',
        'font-style': 'normal',
        'font-weight': 'bold',
        'font-size': '24px',
        'line-height': '28px',

        color: '#000000',

    },

    // Inputs

    name_input: {
        position: 'absolute',
        width: '253.5px',
        height: '42px',
        left: '8.5rem',
        top: '1.5rem',

        border: '2px solid #000000',
        'box- sizing': 'border-box',
        'border-radius': '14px',
        transform: 'matrix(1, 0, 0, -1, 0, 0)',
    },

    address_input: {

        position: 'absolute',
        width: '253.5px',
        height: '42px',
        left: '8.5rem',
        top: '6rem',

        border: '2px solid #000000',
        'box- sizing': 'border- box',
        'border-radius': '14px',
        transform: 'matrix(1, 0, 0, -1, 0, 0)',
    },

    curren_location_input: {
        position: 'absolute',
        width: '25.75px',
        height: '21.75px',
        left: '9rem',
        top: '12rem',

        border: '2px solid #000000',
        'box-sizing': 'border-box',
        'border-radius': '18px',
    },

    input_submit: {
        position: 'absolute',
        width: '344.91px',
        height: '63.78px',
        left: '2.6rem',
        top: '19rem',

        border: '2px solid #000000',
        'box-sizing': 'border- box',
        'border-radius': '14px',
        
    }


}




export class Form extends React.Component {
    constructor(props) {
        super(props)

        //const events = useSelector(state => state)
        //const dispatch = useDispatch()

        this.state = {
            userData: {
                current_location: {},
                name: '',
                address: '',
                rol: {
                    client: Boolean,
                    dealer: Boolean,
                }
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    

    handleChange(event) {
        this.setState({
            userData: {
                current_location: {},
                name: event.target.value,
                address: '',
                rol: {
                    client: Boolean,
                    dealer: Boolean,
                }
            }
        })
    }

    handleSubmit(event) {
        alert(`A name was submitted ${this.state.userData.name}`)
        event.preventDefault()

    }

    render() {
        const style_form = Object.assign({}, formStyles.form);
        const style_name = Object.assign({}, formStyles.name)
        const style_address = Object.assign({}, formStyles.address)
        const style_current_location = Object.assign({}, formStyles.current_location)

        // Inputs
        const style_input_name = Object.assign({}, formStyles.name_input)
        const style_input_address = Object.assign({}, formStyles.address_input)
        const style_input_curren_location_input = Object.assign({}, formStyles.curren_location_input)
        const style_input_submit = Object.assign({}, formStyles.input_submit)

        return (
            <div style={style_form} ref="form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h1
                            style={style_name}
                            ref="name">
                            Name
                        </h1>
                        <input
                            style={style_input_name}
                            type="text"
                            value={this.state.userData.name}
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <label>
                        <h1
                            style={style_address}
                            ref="address">
                            Address
                        </h1>
                        <input
                            style={style_input_address}
                            type="text"
                            value={this.state.userData.address}
                            onChange={this.handleChange}>
                        </input>
                    </label>
                    <label>
                        <h1
                            style={style_current_location}
                            ref="current_location">
                            Current location
                        </h1>
                        <input
                            style={style_input_curren_location_input}
                            type="checkbox"
                            value={this.state.userData.current_location}>
                        </input>
                    </label>
                    <input
                        style={style_input_submit}
                        type="submit"
                        value="Submit">
                    </input>

                </form>
            </div>
        )
    }
}