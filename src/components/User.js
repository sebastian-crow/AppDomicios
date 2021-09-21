import React, { Component } from 'react'

export default class User extends Component {
    componentDidMount() {
        const apiURL = 'https://jsonplaceholder.typicode.com/posts/1'
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data))
    }  


    render() {
        return <h1>Check console.log</h1>
    }
}


