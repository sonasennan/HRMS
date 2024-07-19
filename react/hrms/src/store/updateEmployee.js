import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { updateEmployee } from "../api/updateEmployee";

const initialState= {
    status:"idle",
    data:[]
};

export const updateEmployeeData = createAsyncThunk(
    "updateEmployeeapi",
    async({data,employee_id,successCB}) => {
        console.log(data,"DATA")
        const response = await updateEmployee({data,employee_id,successCB});
        return response.data;
    }

);


const updateSlice = createSlice({
    name:"updateData",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(updateEmployeeData.pending, (state) => {
            state.status="pending";
        })

        .addCase(updateEmployeeData.fulfilled, (state) => {
            state.status="succeeded";
        })

        .addCase(updateEmployeeData.rejected, (state) => {
            state.status="failed";
        });
    },
});

export default updateSlice.reducer;
