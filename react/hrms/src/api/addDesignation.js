import axios from 'axios';

export const postDesignation = ({designation,successCB}) => {
    const url = `${import.meta.env.VITE_APP_BASE_URL}/designation`;
    // console.log("url",designation)
    return axios.post(url, designation)
      .then((res) => {
        successCB()
        return res.data;
      })
      .catch((error) => {
        console.error('Error while posting data:', error);
        throw error;
      });
  };
  