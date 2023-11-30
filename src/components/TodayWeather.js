import axios from 'axios'
import React, { Component } from 'react'
import AxiosApi from '../api/AxiosApi'
import TimeStampConvert from './TimeStampConvert'
import ThreeHRForecast from './ThreeHRForecast'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class TodayWeather extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            lon: 0.0000,
            lat: 0.0000,
            placeName: '', // can be used in search bar
            weatherIcon: '',
            temp: 0.00,
            searchValue: 'Toronto'

        }
    }



      // Update the state when the search input changes
    handleSearchInputChange = (event) => {
        this.setState({ searchValue: event.target.value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        this.getDataUsingAxiosInstance();
      };

    getDataUsingAxiosInstance = async () => {
        try{
        const {searchValue}=this.state
        const data = await AxiosApi.get(`/weather?q=${searchValue}&appid=89a31860a60e11a25748dcac6174e0b1&units=metric`)
        this.setState({
            ...this.state,
            lon: data.data.coord.lon,
            lat: data.data.coord.lat,
            placeName: data.data.name,
            weatherDescription: data.data.weather[0].description,
            weatherIcon: data.data.weather[0].icon,
            forecastedTime: data.data.dt,
            temp: data.data.main.temp,
            mintemp: data.data.main.temp_min,
            maxtemp: data.data.main.temp_max,
            feellike: data.data.main.feels_like,

        })
        console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    //Default toronto

    // get Day of the week
    getDayOfWeek(unixTimestamp) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        const dayOfWeekIndex = date.getUTCDay();
      
        return daysOfWeek[dayOfWeekIndex];
      }

      componentDidMount() { // Auto load when page is loaded (1 time). Lifecycle hook method
        this.getDataUsingAxiosInstance()
    }

    
    render() {
        return (
            <div>
            <nav>
                <form class="form-inline" style={{justifyContent:'center', alignItems:'center'}} onSubmit={this.handleFormSubmit}>
                    <input type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchInputChange} />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </nav>
            <p>{this.state.lat}</p>
            <p>{this.state.lon}</p>
                <div style={{justifyContent:'center', alignItems:'center'}}>
                    <table >
                        <tbody>
                        <tr>
                            <td rowSpan="2" style={{backgroundColor:'lightblue'}}>
                                <h2>{this.getDayOfWeek(this.state.forecastedTime)}</h2>
                                <TimeStampConvert forecastedTime={this.state.forecastedTime} />
                                <p>{this.state.placeName}</p>
                                <img src={`http://openweathermap.org/img/wn/${this.state.weatherIcon}@2x.png`} alt={this.state.weatherDescription} /> 
                                <h1>{this.state.temp}&deg;C</h1>
                                <p>{this.state.weatherDescription}</p>
                            </td>
                            <td>
                                <ThreeHRForecast cityLat={this.state.lat} cityLon={this.state.lon}/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor:'black', color:'white'}}>
                              <p><b>Min Temp:</b> {this.state.mintemp}&deg;C</p>
                              <p><b>Max Temp:</b> {this.state.maxtemp}&deg;C</p>
                              <p><b>Feels Like:</b> {this.state.feellike}&deg;C</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
  }
}
