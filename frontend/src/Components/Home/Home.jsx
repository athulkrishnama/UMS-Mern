import { useDispatch, useSelector } from "react-redux";
import {setToken} from '../../store/slices/authSlice'
import {useNavigate} from 'react-router-dom'
function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(setToken(null))
    navigate('/login')
  }
  return (
    <div>
      <nav className="py-5 bg-purple-700 flex justify-between px-20">
        <h2 className="font-sans font-bold text-3xl  text-white ">
          Welcome {user.username}
        </h2>
        <button className="border-white  rounded-lg bg-red-600 px-3 text-white font-bold" onClick={handleLogout}>Log Out</button>
      </nav>
      <div className="flex justify-center mt-10">
        <div className="flex items-center flex-col">
          <img className="h-40 w-40 rounded-full" src={user.image} alt="" />
          <h1 className="mt-3 font-sans  text-2xl">Name: {user.username}</h1>
          <h2 className="mt-3 font-sans  text-2xl">Email: {user.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
