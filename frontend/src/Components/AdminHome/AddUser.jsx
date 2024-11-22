import { useState } from "react";
import  axiosModule from 'axios'
import axios from '../../axios/axios'
import { useDispatch } from "react-redux";
import { close } from "../../store/slices/addUserSlice"; 
function AddUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
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
      dispatch(close())
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='bg-white bg-opacity-70 backdrop-blur-md flex justify-center items-center w-screen h-screen absolute top-0 left-0'>
      <div className='bg-white p-5 rounded-md w-1/4'>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl/10 font-bold  tracking-tight text-gray-900">
            Add User
          </h2>
        </div>
        <button onClick={()=>dispatch(close())} className="bg-red-600 rounded-md px-3 py-1 text-gray-100 font-bold float-right">Close</button>
        <div className="mt-10 sm:mx-auto  w-3/4">
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
          
        </div>
      </div>
    </div>
  )
}

export default AddUser
