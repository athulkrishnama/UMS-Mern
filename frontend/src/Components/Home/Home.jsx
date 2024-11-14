import { useSelector } from "react-redux"
function Home() {
  const user = useSelector(state=>state.user.value)
  console.log(user)
  return (
    <div>
      <h1>Name: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <img src={user.image} alt="" />
    </div>
  )
}

export default Home
