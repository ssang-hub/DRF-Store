import axios from 'axios';
export default axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}`,
  headers: { 'Content-type': 'application/json' },
});
