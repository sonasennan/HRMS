import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export  const logout = () => {
  const url = `${BASE_URL}/logout`;
  return axios.post(url)
    .then((res) => {
      console.log("logged out successfully");
      return res.data;
    })
    .catch((error) => {
      console.error('Error', error);
      throw error;
    });
};

