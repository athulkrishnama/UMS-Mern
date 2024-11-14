import styles from './Signup.module.css'
import axios from '../../axios/axios'
import axiosModule from 'axios';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {setToken} from '../../store/slices/authSlice'
import {setUser as setUserSlice} from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [user, setUser] = useState({username:'',email:'',password:'',image:null});
    const [image, setImage] = useState(null)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDataChange = (e)=>{
        const key = e.target.name;
        if(key === 'image'){
            setImage(e.target.files[0])
            return setUser({...user, 'image':URL.createObjectURL(e.target.files[0])})
        }
        setUser({...user, [key]:e.target.value})
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        const formData =new FormData();
        formData.append('file', image)
        formData.append('cloud_name','dnkdja8nb')
        formData.append('upload_preset', 'profilePictures')
        const imageData = await axiosModule.post('https://api.cloudinary.com/v1_1/dnkdja8nb/image/upload', formData)
        const response =await axios.post('/signup', {...user, image:imageData.data.secure_url})
        if(response.data.err){
          return setError(response.data.err)
        }
        dispatch(setToken(response.data.token))
        dispatch(setUserSlice(response.data.user))
        navigate('/')
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className={styles.signupParent}>
      <div className={styles.signupForm}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name='username'  onChange={handleDataChange} value={user.username}/>
            <input type="text" name='email'  onChange={handleDataChange} value={user.email}/>
            <input type="password" name='password'  onChange={handleDataChange} value={user.password}/>
            {user.image&&<img src={user.image} alt=""/>}
            <input type="file" name='image' onChange={handleDataChange} />
            <p >{error}</p>
            <button type='submit'>SignUp</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
