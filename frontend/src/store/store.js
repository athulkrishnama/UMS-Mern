import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import adminToken from './slices/adminAuthSlice'
import editUser from './slices/editUserSlice'
import addUser  from './slices/addUserSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        adminToken:adminToken,
        editUser,
        addUser
    }
})

export default store;