// src/services/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/clients',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
