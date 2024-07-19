import axios from 'axios';

export const postEmployee = (data, successCB) => {
    const url = `${import.meta.env.VITE_APP_BASE_URL}/employee`;
    console.log("url",data)
    return axios.post(url, data)
      .then((res) => {
          console.log(res.data, "EMPLOYEE ADD RES ")
          successCB(res)
        return res.data;
      })
      .catch((error) => {
        console.error('Error while posting data:', error);
        throw error;
      });
  };
    