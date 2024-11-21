import { createSlice } from "@reduxjs/toolkit";

const userList = createSlice({
    name:"userList",
    initialState:{
        value:[]
    },
    reducers:{
        addData:(state,action)=>{
            state.value  = action.payload
        }
    }
})


export default userList.reducer;
export const {addData} = userList.actions;