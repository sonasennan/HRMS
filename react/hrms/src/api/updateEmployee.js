import axios from 'axios';

export const updateEmployee = ({data,employee_id,successCB,errorCB}) => {
  console.log(data,"update data")
  const url = `${import.meta.env.VITE_APP_BASE_URL}/update_employee/${employee_id}`;
  return axios.put(url,data)
    .then((res) => {
      successCB()
      return res;
    })
    .catch((error) => {
      console.log(error.response.data.message,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
      const res=error.response.data.message;
      errorCB(res)
    });
};