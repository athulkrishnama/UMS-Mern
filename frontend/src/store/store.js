import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import adminToken from './slices/adminAuthSlice'
import editUser from './slices/editUserSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        adminToken:adminToken,
        editUser
    }
})

export default store;