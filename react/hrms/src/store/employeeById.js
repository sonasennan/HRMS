import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployeeById } from '../api/employeeById';


const initialState={
    status:'idle',
    data:null,
    error:null
};

export const getEmployeeByIdData = createAsyncThunk(
    'eachEmployee',
    async (employee_id) =>
        {
            const response = await fetchEmployeeById(employee_id);
            console.log(response,"RESPONSE")
            return response;
        },
);


const eachEmployeeDataSlice = createSlice(
    {
        name:'eachEmployeeData',
        initialState,
        reducers:{},
        extraReducers : (builder) => {
            builder

            .addCase(getEmployeeByIdData.pending, (state)=> {
                state.status="pending";
            })

            .addCase(getEmployeeByIdData.fulfilled, (state,action) => {
                state.status="succeeded";
                state.data=action.payload;
                console.log(action,"Action")
                state.error=null;
            })

            .addCase(getEmployeeByIdData.rejected, (state,action) => {
                state.status="failed";
                state.error=action.error.message;

            });
        }
    }
)

export default eachEmployeeDataSlice.reducer;
