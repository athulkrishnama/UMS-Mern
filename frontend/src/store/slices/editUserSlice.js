import { createSlice } from "@reduxjs/toolkit";

const editUserSlice = createSlice({
    name:'editUser',
    initialState:{
        value:{}
    },
    reducers:{
        setUser:(state,action)=>{
            state.value = action.payload;
        }
    }
})


export default editUserSlice.reducer
export const {setUser} = editUserSlice.actions;