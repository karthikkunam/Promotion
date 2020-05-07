import axios from 'axios';
import { BASE_SERVICE_URI, TOKEN} from '../redux/constants/actionTypes'

export const API = () => axios.create({
  method: 'GET',
  // baseURL: `http://localhost:5000/services`,
  baseURL: process.env.BASE_SERVICE_URI ? process.env.BASE_SERVICE_URI : BASE_SERVICE_URI,
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
    'Authorization': process.env.TOKEN ? process.env.TOKEN : TOKEN,
    "x-api-key" : process.env.TOKEN ? process.env.TOKEN : TOKEN

  }
});

export default API;
