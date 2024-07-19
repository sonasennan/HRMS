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

// employeelist.js (actions)
// export const getEmployeeById = (employee_id) => async (dispatch) => {
//   try {
//     const url = `${import.meta.env.VITE_APP_BASE_URL}/employee/${employee_id}`;
//     const response = await axios.get(url);
//     dispatch({ type: 'GET_EMPLOYEE_SUCCESS', payload: response.data });
//   } catch (error) {
//     console.error('Error fetching employee details:', error);
//     // Handle error state or throw error
//   }
// };
