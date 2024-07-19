import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { postDesignation } from "../api/addDesignation";

const initialState ={
    status:"idle",
    data:[]
}

export const postDesignationData = createAsyncThunk(
    "AddDesignationData",
    async({designation,successCB}) =>{
        console.log(designation,"DATA")
            const response = await postDesignation({designation,successCB})
            return response;
        }
)


export const postDesignationSlice = createSlice({
    name:"postDesignationData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postDesignationData.pending,(state)=>{
            state.status = "loading";
        })

        .addCase(postDesignationData.fulfilled,(state)=>{
            state.status= "succeeded";
        })

        .addCase(postDesignationData.rejected,(state)=>{
            state.status="failed";
        });

    }
})

export default postDesignationSlice.reducer;