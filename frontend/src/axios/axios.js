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

export default instance;