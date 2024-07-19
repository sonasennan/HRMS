import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { updateDesignation } from "../api/updateDesignation";

const initialState= {
    status:"idle",
    data:[]
};

export const updateDesignationData = createAsyncThunk(
    "updateDesignationapi",
    async({data,designation_id,successCB}) => {
        const response = await updateDesignation({data,designation_id,successCB});
        return response.data;
    }

);


const updateDesignationSlice = createSlice({
    name:"updateDesignationData",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(updateDesignationData.pending, (state) => {
            state.status="pending";
        })

        .addCase(updateDesignationData.fulfilled, (state) => {
            state.status="succeeded";
        })

        .addCase(updateDesignationData.rejected, (state) => {
            state.status="failed";
        });
    },
});

export default updateDesignationSlice.reducer;
