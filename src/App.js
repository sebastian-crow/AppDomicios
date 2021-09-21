import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom'

import Home from './components/Home'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

//import { useSelector, useDispatch } from 'react-redux'
//import { startAction } from './actions'

//import { ExampleForm } from "./components/Form"



function ModalSwitch() {
  let location = useLocation()
  let background = location.state && location.state.background

  return (
    <Switch location={background || location}>
      <Route exact path="/" children={<Home />} />
      <Route exact path="/signup" children={<SignUp />} />
      <Route exact path="/signin" children={<SignIn />} />
    </Switch>
  )
}



function App() {
  //const events = useSelector(state => state.events)
  //const rotate = useSelector(state => state.rotate)
  //const getLocation = useSelector(state => state.location)
  //const dispath = useDispatch()
  

  return (
    <Router>
      <ModalSwitch />
    </Router>
  )
}

export default App






// <button onClick={() => dispath(startAction(1))}>Location</button>


/*


import './App.css';
import Map from './components/Map'

function App() {
  return (
    <Map></Map>
  );
}

export default App;


<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>


const initMap = () => {
    const myLatLng = {lat: -25.364, lng: 131.004}
    map = new google.maps.Map(document.getElementById('mapView', {
      zoom: 4,
      center: myLatLng,
    }))
  }



*/