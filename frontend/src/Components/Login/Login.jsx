import { useState } from "react";
import axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setToken, } from "../../store/slices/authSlice";
import {setUser as setUserSlice } from '../../store/slices/userSlice'
function Login() {
    const [user, setUser] = useState({email:'', password:''})
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDataChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response =await axios.post('/login',user)
            console.log(response.data)
            if(response.data.err){
              console.log("error")
                return setError(response.data.err)
            }
            console.log("here")
            dispatch(setToken(response.data.token));
            dispatch(setUserSlice(response.data.user));
            navigate('/')
        }catch(err){
          console.log(err)
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name='email' onChange={handleDataChange} value={user.email}/>
          <input type="password" name='password' onChange={handleDataChange} value={user.password} />
          <p>{error}</p>
          <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default Login
