import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees } from '../api/listApi';
import { postEmployee } from "../api/postEmployee";


const initialState={
    status:'idle',
    data:[],
};

export const getEmployeeData = createAsyncThunk(
    'employeeData',
    async () =>
        {
            const response = await fetchEmployees();
            console.log(response.data,"response")
            return response.data;
        },
);

export const postEmployeeData = createAsyncThunk(
    "addEmployeeData",
    async({employee, successCB}) =>{
            console.log(employee,"data")
            const response = await postEmployee(employee,successCB)
            console.log(response,"response")
            return response
        }
)



const employeeDataSlice = createSlice(
    {
        name:'employeeData',
        initialState: initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder
            .addCase(getEmployeeData.pending, (state) => {
                state.status="pending";})

            .addCase(getEmployeeData.fulfilled, (state,action) =>
                {
                    state.status='succeeded';
                    console.log(action.payload,"Action");
                    state.data=action.payload;
                })

            .addCase(getEmployeeData.rejected, (state) =>
                {
                    state.status='failed';
                })

                


                .addCase(postEmployeeData.pending,(state)=>{
                    state.status = "loading";
                })
        
                .addCase(postEmployeeData.fulfilled,(state)=>{
                    state.status= "succeeded";
                })
        
                .addCase(postEmployeeData.rejected,(state)=>{
                    state.status="failed";
                });
        }
    }
);

export default employeeDataSlice.reducer;