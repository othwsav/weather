// import { render } from '@testing-library/react'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Load from './Load'

class Weather extends Component {
    

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

    doSearch = async () => {
        // await console.log(this.state)
        await this.setState({
            loading: true
        })

        let APIKEY, city, API, data
        try {
            APIKEY = "66941712dc19e2561d1da16dad62bc33"
            city = this.props.match.params.city
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
        // await console.log(this.state)
        this.x = true
    }

    showW = () => {

        const {wheatherVals,wheatherNames,iconUrl,error} = this.state
        
        if(error === false){
            let wElems = wheatherNames.map((e,i) => {
                return  <div key={i} className="data_element">
                            <span>
                                <img src={process.env.PUBLIC_URL + `/images/${i}.svg`} alt={e + ' wheather'} />
                            </span>
                            <span>{e}:</span>
                            <span>{wheatherVals[i]}</span>
                        </div>
            })

            return(
                <>
                    <div className="icon">
                        <span>general weather:</span>
                        <div>
                            <img src={iconUrl} alt="weather icon"/>
                        </div>
                    </div>
                    <div className="elems">{wElems}</div>
                </>
            )

        }else{
            if(typeof error === "string")
                return (<div className="error">{error}</div>)
        }
    }

    x = true
    render(){
        if(this.x){
            this.x = false
            this.doSearch()
        }
        return (
            <div>
                {(this.state.loading)? <Load/> :  this.showW()}
            </div>
        )
    }

}

export default withRouter(Weather);