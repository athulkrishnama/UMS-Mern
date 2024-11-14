import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import adminToken from './slices/adminAuthSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        user:userSlice,
        adminToken:adminToken
    }
})

export default store;