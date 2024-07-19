import axios from 'axios';

export const fetchDesignation = () => {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/designations`;
  return axios.get(url)
    .then((res) => {
      return res.data;
    })
    .catch((error) => { 
      console.log(error);
      throw error;
    });
};