import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open:false
}
const addUserSlice = createSlice({
    name:"AddUser",
    initialState,
    reducers:{
        open:(state)=>{
            state.open = true
        },
        close:(state)=>{
            state.open = false
        }
    }
})

export const {open, close} = addUserSlice.actions
export default addUserSlice.reducer