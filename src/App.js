import React, {Component} from 'react'
import './App.css';
import Form from './components/Form'
import Weather from './components/Weather'
import Load from './components/Load'

class App extends Component {
	state = {
		wheatherVals : [
			'', '', '', '', '', '', '', ''
		],
		wheatherNames : [
			'city', 'country', 'description', 'temperature', 'humidity', 'pressure', 'wind degree', 'wind speed'
		],
		iconUrl: '',
		error: true,
		loading: false
	}



	getWeather = async (e) => {
		e.preventDefault()
		await this.setState({
			loading: true
		})

		let APIKEY, city, API, data
		try {
			APIKEY = "66941712dc19e2561d1da16dad62bc33"
			city = e.target.elements.city.value
			API = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
			data = await API.json();
			this.setState({
				wheatherVals:[
					data.name, data.sys.country, data.weather[0].description, data.main.temp + "°C", data.main.humidity + "%", data.main.pressure + "hPa", data.wind.deg + "°", data.wind.speed + "Km/h"
				],
				iconUrl: process.env.PUBLIC_URL + `images/GWI/${data.weather[0].icon}.svg`,//`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
				error: false
			})
			
			await this.setState({
				loading: false
			})
			
		} catch (error) {
			this.setState({
				error: (data)? data.message : "Connection problem, Check out your Internet!"
			})

			await this.setState({
				loading: false
			})
		}
	
	}

	render() {
		return (
			<div className="App">
				<Form get={this.getWeather}/>
				{(this.state.loading)? <Load/> : <Weather wev={this.state.wheatherVals} wen={this.state.wheatherNames} icon={this.state.iconUrl} error={this.state.error}/>}
				
			</div>
		)
	}
}

export default App;
