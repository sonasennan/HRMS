import axios from 'axios';

export const login = (data,successCB,errorCB) => {
    const url = `${import.meta.env.VITE_APP_BASE_URL}/login`;
    console.log("url",data)
    return axios.post(url, data)
      .then((res) => {
          console.log(res.data)
          successCB()
          if(successCB) successCB("Success")
          return res.data;
      })
      .catch((error) => {
        console.log(error.response.data.message,"errorrrrr")
        const resp=error.response.data.message
        errorCB(resp)

      });
  };
  
