import axios from 'axios';

export const updateDesignation = ({data,designation_id,successCB}) => {
  const url = `${import.meta.env.VITE_APP_BASE_URL}/update_designation/${designation_id}`;
  return axios.put(url,data)
    .then((res) => {
      successCB()
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};