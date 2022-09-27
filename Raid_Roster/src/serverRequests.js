import axios from 'axios';

const path = `http://localhost:3000`;
const headers = {}

const server = {
  getGuildies: (endpoint, params) => {
    return axios.get(path + endpoint, {'params': params })
  },
  getChar: (endpoint, params) => {
    return axios.get(path + endpoint, {'params': params })
  }
};

export default server