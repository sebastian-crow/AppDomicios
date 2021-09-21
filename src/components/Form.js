import React from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { location } from '../actions'
//import { CurrentLocation } from '../components/Location'



//const formStyles = {}

export class ExampleForm extends React.Component {
    constructor(props) {
        super(props)

       

        this.state = {
            userData: {
                currentLocation: {},
                name: "",
                address: "",
                rol: {
                    client: Boolean,
                    dealer: Boolean
                }
            }
        }
    }
    
    changeHanlder = (event) => {
        let nam = event.target.value
        let val = event.target.value
        this.setState({[nam]: val})
        console.log(this.state)
    }

    render() {
        return(

            <form>
                <h1>Name</h1>
                <input
                    type="text"
                    name="name"
                    onChange={this.changeHanlder}
                />
                <h1>Location</h1>
                <input
                    type="text"
                    name="current_location"
                    onChange={this.changeHanlder}
                />
                <input type="submit" />
            </form>
        )
    }
}