import axios from "../../axios/axios";
import axiosModule from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setUser as setUserSlice } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDataChange = (e) => {
    const key = e.target.name;
    if (key === "image") {
      setImage(e.target.files[0]);
      return setUser({
        ...user,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
    setUser({ ...user, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("cloud_name", "dnkdja8nb");
      formData.append("upload_preset", "profilePictures");
      const imageData = await axiosModule.post(
        "https://api.cloudinary.com/v1_1/dnkdja8nb/image/upload",
        formData
      );
      const response = await axios.post("/signup", {
        ...user,
        image: imageData.data.secure_url,
      });
      if (response.data.err) {
        return setError(response.data.err);
      }
      dispatch(setToken(response.data.token));
      dispatch(setUserSlice(response.data.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <div className={styles.signupParent}>
    //   <div className={styles.signupForm}>
    //     <h1>Signup</h1>
    //     <form onSubmit={handleSubmit}>
    //         <input type="text" name='username'  onChange={handleDataChange} value={user.username}/>
    //         <input type="text" name='email'  onChange={handleDataChange} value={user.email}/>
    //         <input type="password" name='password'  onChange={handleDataChange} value={user.password}/>
    //         {user.image&&<img src={user.image} alt=""/>}
    //         <input type="file" name='image' onChange={handleDataChange} />
    //         <p >{error}</p>
    //         <button type='submit'>SignUp</button>
    //     </form>
    //   </div>
    // </div>
    <div className="h-[100vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl/10 font-bold  tracking-tight text-gray-900">
            Create Your Account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  value={user.username}
                  onChange={handleDataChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
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
                  type="text"
                  value={user.email}
                  onChange={handleDataChange}
                  required
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
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="mt-2">
                {user.image && (
                  <img className="object-cover" src={user.image} alt="" />
                )}
              </div>
              <label className="block mt-3">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
       
       
       
      "
                  name="image"
                  required
                  onChange={handleDataChange}
                />
              </label>
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
            Already have an account?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Just Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
