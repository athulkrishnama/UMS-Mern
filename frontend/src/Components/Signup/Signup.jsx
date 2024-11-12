import styles from './Signup.module.css'
import { useState } from 'react';
function Signup() {
    const [user, setUser] = useState({username:'',email:'',password:'',image:null});
    const handleDataChange = (e)=>{
        const key = e.target.name;
        if(key === 'image'){
            return setUser({...user, 'image':URL.createObjectURL(e.target.files[0])})
        }
        setUser({...user, [key]:e.target.value})
    }
  return (
    <div className={styles.signupParent}>
      <div className={styles.signupForm}>
        <h1>Signup</h1>
        <form>
            <input type="text" name='username'  onChange={handleDataChange} value={user.username}/>
            <input type="text" name='email'  onChange={handleDataChange} value={user.email}/>
            <input type="password" name='password'  onChange={handleDataChange} value={user.password}/>
            {user.image&&<img src={user.image} alt=""/>}
            <input type="file" name='image' onChange={handleDataChange} />
            <button type='submit'>SignUp</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
