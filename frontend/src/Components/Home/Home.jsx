import { useSelector } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  return (
    <div>
      <nav>
        <h2 className="font-sans font-bold text-3xl text-center text-white py-5 bg-purple-700">
          Welcome {user.username}
        </h2>
      </nav>
      <div className="flex justify-center mt-10">
        <div className="flex align-middle flex-col">
          <img className="h-40 w-40 rounded-full" src={user.image} alt="" />
          <h1 className="mt-3 font-sans  text-2xl">Name: {user.username}</h1>
          <h2 className="mt-3 font-sans  text-2xl">Email: {user.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
