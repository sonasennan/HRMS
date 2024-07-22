import axios from 'axios';

export const fetchEmployeeById = (employee_id) => {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/employee/${employee_id}`;
  return axios.get(url)
    .then((res) => {
      console.log(res.data,"Response")
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};


