import axios  from "axios";

const BASE_URL = 'http://api.openweathermap.org/data/2.5'
const instance = axios.create({  
    baseURL:BASE_URL,
    timeout: 1000,
    //headers:{'X-Cumtsom-Header':'labtest2'}
});

export default instance;