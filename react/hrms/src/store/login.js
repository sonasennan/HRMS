import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/loginApi";

const initialState ={
    status:"idle",
    data:[]
}

export const postLoginData = createAsyncThunk(
    "loginData",
    async({loginData,successCB,errorCB}) =>{
            console.log(loginData,"data")
            const response = await login(loginData,successCB,errorCB)
            console.log(response,"response")
            return response;
        }
)


export const LoginSlice = createSlice({
    name:"loginData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postLoginData.pending,(state)=>{
            state.status = "loading";
        })

        .addCase(postLoginData.fulfilled,(state)=>{
            state.status= "succeeded";
        })

        .addCase(postLoginData.rejected,(state)=>{
            state.status="failed";
        });

    }
})

export default LoginSlice.reducer;