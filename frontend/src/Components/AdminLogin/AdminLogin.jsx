import { useState } from "react"
import { adminInstance } from "../../axios/axios";
import {setToken} from '../../store/slices/adminAuthSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
    const [user, setUser] = useState({email:'', password:''});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDataChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const result = await adminInstance.post('/login', user);
            console.log(result)
            dispatch(setToken(result.data.token));
            navigate('/admin')
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={user.email} onChange={handleDataChange}/>
            <input type="password" name="password" value={user.password} onChange={handleDataChange} />
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default AdminLogin
