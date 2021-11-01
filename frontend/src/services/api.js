import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: { 'Authorization': 'Bearer ' + token }
});

export const setToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api;
