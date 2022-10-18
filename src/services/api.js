import axios from "axios";
import LocalService from "./local.service";
import auth from './auth';
import {API_URL} from '../constants'

const instance = axios.create({
  baseURL: API_URL+'api/',
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = LocalService.get("token");
    if (token) {
       config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      //config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use((response)=>{
  if(response.status==401){
    auth.logout();
  }
  return response;
})

export default instance;