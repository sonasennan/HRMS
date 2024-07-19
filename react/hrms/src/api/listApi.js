import axios from 'axios';

export const fetchEmployees = () => {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/employees`;
  return axios.get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};