import { useState } from "react";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setUser as setUserSlice } from "../../store/slices/userSlice";
function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", user);
      console.log(response.data);
      if (response.data.err) {
        console.log("error");
        return setError(response.data.err);
      }
      console.log("here");
      dispatch(setToken(response.data.token));
      dispatch(setUserSlice(response.data.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <div>
    //     <h1>Login</h1>
    //     <form onSubmit={handleSubmit}>
    //       <input type="text" name='email' onChange={handleDataChange} value={user.email}/>
    //       <input type="password" name='password' onChange={handleDataChange} value={user.password} />
    //       <p>{error}</p>
    //       <button type='submit'>Login</button>
    // </form>
    // </div>
    <div className="h-[100vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl/10 font-bold  tracking-tight text-gray-900">
            Login To Your Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleDataChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleDataChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-orange-600">{error}</p>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >

                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <button onClick={()=>{navigate('/signup')}}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign Up Now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
