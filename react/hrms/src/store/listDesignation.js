import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDesignation } from '../api/listDesignation';


const initialState={
    status:'idle',
    data:[],
};

export const getDesignationData = createAsyncThunk(
    'designationData',
    async () =>
        {
            const response = await fetchDesignation();
            return response;
        },
);





const designationDataSlice = createSlice(
    {
        name:'designationData',
        initialState: initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder
            .addCase(getDesignationData.pending, (state) => {
                state.status="pending";})


            .addCase(getDesignationData.fulfilled, (state,action) =>
                {
                    state.status='succeeded';
                    console.log(action,"Action");
                    state.data=action.payload;
                })


            .addCase(getDesignationData.rejected, (state) =>
                {
                    state.status='failed';
                });


        }
    }
);

export default designationDataSlice.reducer;