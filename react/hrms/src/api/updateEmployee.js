import axios from 'axios';

export const updateEmployee = ({data,employee_id,successCB}) => {
  console.log(data,"update data")
  const url = `${import.meta.env.VITE_APP_BASE_URL}/update_employee/${employee_id}`;
  return axios.put(url,data)
    .then((res) => {
      successCB()
      return res;
    })
    .catch((error) => {
      throw error;
    });
};