import axios from "axios";

const API = axios.create({ baseURL: 'http://api.weatherapi.com/v1' });

const key= '798ff68ee4c742838c8113015220807';

export const getWeather=(location)=> API.get(`/current.json?key=${key}&q=${location}`)
export const getAutoComplete=(query)=> API.get(`/search.json?key=${key}&q=${query}`)