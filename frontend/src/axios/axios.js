import axios from 'axios'
import store from '../store/store'

const instance =   axios.create({
    baseURL:'http://localhost:4000/'
})

instance.interceptors.request.use(config=>{
    const token = store.getState().auth.token
    if(token){
        config.headers['Authorization'] = 'Bearer ' +  token
    }
    return config;
},(err)=>{
    Promise.reject(err);
})

const adminInstance = axios.create({
    baseURL:'http://localhost:4000/admin'
})
adminInstance.interceptors.request.use(config=>{
    const token = store.getState().adminToken.token
    console.log("from interceptor"+token)
    if(token){
        config.headers['Authorization'] = 'Bearer ' +  token
    }
    return config;
},(err)=>{
    Promise.reject(err);
})

export {adminInstance}
export default instance;