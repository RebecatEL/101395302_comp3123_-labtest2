import axios from 'axios'
import React, { Component } from 'react'
import AxiosApi from '../api/AxiosApi'
import TimeStampConvert from './TimeStampConvert'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class ThreeHRForecast extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            item1:[],
            item2:[],
            item3:[],
            item4:[],
            item5:[],
            item6:[],
            item7:[],
            lat: 0.0000,
            lon: 0.0000,
        }
    }


    componentDidMount() { // Auto load when page is loaded (1 time). Lifecycle hook method
        this.getDataUsingAxiosInstance(this.state.lat, this.state.lon)
    }


    getDataUsingAxiosInstance = async (lat,lon) => {
        try{
        const data = await AxiosApi.get(`/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=89a31860a60e11a25748dcac6174e0b1&units=metric`)
        this.setState({
            ...this.state,
            item1: {...data.data.list[0]},
            item2: {...data.data.list[1]},
            item3: {...data.data.list[2]},
            item4: {...data.data.list[3]},
            item5: {...data.data.list[4]},
            item6: {...data.data.list[5]},
            item7: {...data.data.list[6]},
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

    getHours(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
        var hours = date.getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours + ampm;
        return hours;
      }


    render() {
        const lat = this.props.cityLat;
        const lon = this.props.cityLon;
        this.getDataUsingAxiosInstance(lat,lon)

        return (
            <div>
                <div>
                    <h2>3 Hour Forecast</h2>
                    <div className="container">
                        <div className="row">
                            { this.state.item1 && this.state.item1.weather && this.state.item1.main &&(
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item1.weather[0].icon}@2x.png`} alt={this.state.item1.weather[0].icon} />
                                <p>{this.getDayOfWeek(this.state.item1.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item1.dt} />
                                <p>{this.getHours(this.state.item1.dt)}</p>
                                <h3>{this.state.item1.main.temp}&deg;C</h3>
                                
                            </div>
                            )}
                            { this.state.item2 && this.state.item2.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item2.weather[0].icon}@2x.png`} alt={this.state.item2.weather[0].icon} /> 
                                <p>{this.getDayOfWeek(this.state.item2.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item2.dt} />
                                <p>{this.getHours(this.state.item2.dt)}</p>
                                <h3>{this.state.item2.main.temp}&deg;C</h3>
                                
                            </div>
                            )}
                            { this.state.item3 && this.state.item3.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item3.weather[0].icon}@2x.png`} alt={this.state.item3.weather[0].icon} /> 
                                <p>{this.getDayOfWeek(this.state.item3.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item3.dt} />
                                <p>{this.getHours(this.state.item3.dt)}</p>
                                <h3>{this.state.item3.main.temp}&deg;C</h3>
                            </div>
                            )}
                            { this.state.item4 && this.state.item4.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item4.weather[0].icon}@2x.png`} alt={this.state.item4.weather[0].icon} /> 
                                <p>{this.getDayOfWeek(this.state.item4.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item4.dt} />
                                <p>{this.getHours(this.state.item4.dt)}</p>
                                <h3>{this.state.item4.main.temp}&deg;C</h3>
                            </div>
                            )}
                            { this.state.item5 && this.state.item5.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item5.weather[0].icon}@2x.png`} alt={this.state.item5.weather[0].icon} /> 
                                <p>{this.getDayOfWeek(this.state.item5.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item5.dt} />
                                <p>{this.getHours(this.state.item5.dt)}</p>
                                <h3>{this.state.item5.main.temp}&deg;C</h3>
                            </div>
                            )}
                            { this.state.item6 && this.state.item6.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item6.weather[0].icon}@2x.png`} alt={this.state.item6.weather[0].icon} /> 
                                <p>{this.getDayOfWeek(this.state.item6.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item6.dt} />
                                <p>{this.getHours(this.state.item6.dt)}</p>
                                <h3>{this.state.item6.main.temp}&deg;C</h3>
                            </div>
                            )}
                            { this.state.item7 && this.state.item7.weather && (
                            <div className="col-sm">
                                <img src={`http://openweathermap.org/img/wn/${this.state.item7.weather[0].icon}@2x.png`} alt={this.state.item7.weather[0].icon} />
                                <p>{this.getDayOfWeek(this.state.item7.dt)}</p>
                                <TimeStampConvert forecastedTime={this.state.item7.dt} />
                                <p>{this.getHours(this.state.item7.dt)}</p>
                                <h3>{this.state.item7.main.temp}&deg;C</h3>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
  }
}
