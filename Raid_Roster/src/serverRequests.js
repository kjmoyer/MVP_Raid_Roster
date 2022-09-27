import axios from 'axios';

const path = `http://localhost:3000`;
const headers = {}

const server = {
  get: (endpoint, params) => {
    return axios.get(path + endpoint, {'params': params })
  },
  post: (endpoint, data) => {
    return axios.post(path + endpoint, data);
  }
};

export default server