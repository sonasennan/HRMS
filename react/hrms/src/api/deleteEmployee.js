import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export  const deleteEmployee = (employee_id) => {
  const url = `${BASE_URL}/delete_employee/${employee_id}`;
  return axios.post(url)
    .then((res) => {
      console.log('Employee deleted successfully:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
      throw error;
    });
};


