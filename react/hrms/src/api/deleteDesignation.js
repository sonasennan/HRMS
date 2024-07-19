import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export  const deleteDesignation = (designation_id) => {
  const url = `${BASE_URL}/delete_designation/${designation_id}`;
  return axios.post(url)
    .then((res) => {
      console.log('Designation deleted successfully:', res.data);
      return res.data;
    })
    .catch((error) => {
      console.error('Error deleting designation:', error);
      throw error;
    });
};


