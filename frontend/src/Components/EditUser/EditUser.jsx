import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { adminInstance } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
function EditUser() {
    const navigate  = useNavigate()
  const userData = useSelector((state) => state.editUser.value);
  console.log(userData);
  const [user, setUser] = useState({
    username: userData.username,
    email: userData.email,
    imageUrl: userData.imageUrl,
  });
  const [image, setImage] = useState();
  const handleDataChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if (key === "image") {
      console.log("image changing");
      setUser({ ...user, imageUrl: URL.createObjectURL(e.target.files[0]) });
      setImage(e.target.files[0]);
    } else {
      setUser({ ...user, [key]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("cloud_name", "dnkdja8nb");
      formData.append("upload_preset", "profilePictures");
      
      const imageUrl = image? await axios.post('https://api.cloudinary.com/v1_1/dnkdja8nb/image/upload', formData):null;
      const response = await adminInstance.post('/updateUser', {...user, imageUrl:image?imageUrl.data.secure_url:user.imageUrl,id:userData._id})
      console.log(response)
      navigate('/admin')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" name="username" onChange={handleDataChange} />
    //     <input type="text" name="email" onChange={handleDataChange} />
    //     <img
    //       src={user.imageUrl}
    //       alt=""
    //       style={{ width: "15rem", height: "15rem" }}
    //     />
    //     <input type="file" name="image" onChange={handleDataChange} />
    //     <button type="submit">Update</button>
    //   </form>
    // </div>
    <div className="h-[100vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl/10 font-bold  tracking-tight text-gray-900">
            Edit User Data
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
            {/* <div className="mt-2">
              <p className="text-orange-600">{error}</p>
            </div> */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        
        </div>
      </div>
    </div>
  );
}

export default EditUser;
