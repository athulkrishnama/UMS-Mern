import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name:"Admin Auth Token",
    initialState:{
        token:null
    },
    reducers:{
        setToken:(state,action)=>{
            state.token = action.payload;
        },
        removeToke:(state)=>{
            state.token = null;
        }
    }
})

export const {setToken, removeToke} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;