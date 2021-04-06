import React, { Component } from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

import './App.css';
import Form from './components/Form'
import Weather from './components/Weather'
// import Load from './components/Load'


class App extends Component{

	state = {
		pathname: ""
	}
	
	getWeather = async(e) => {
		e.preventDefault()
		await this.setState({
			pathname: "/" + e.target.elements.city.value
		})
		// window.location.pathname = "/" + e.target.elements.city.value
		await document.getElementById("togoLink").click()
    }



	render(){
		return (
			<BrowserRouter>
				<div className="App">
						<Form get={this.getWeather}/>
						<Link id="togoLink" to={this.state.pathname} />
						<Route path="/:city" component={Weather} />
				</div>
			</BrowserRouter>
		)
	}
}

export default App;
