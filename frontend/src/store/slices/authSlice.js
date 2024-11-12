import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        value:''
    },
    reducers:{
        setUser:(state,action)=>{
            state.value = action.payload;
        }
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;