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
      
      const imageUrl = !image?? await axios.post('https://api.cloudinary.com/v1_1/dnkdja8nb/image/upload', formData);
      const response = await adminInstance.post('/updateUser', {...user, imageUrl:image?imageUrl.data.secure_url:user.imageUrl,id:userData._id})
      console.log(response)
      navigate('/admin')
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleDataChange} />
        <input type="text" name="email" onChange={handleDataChange} />
        <img
          src={user.imageUrl}
          alt=""
          style={{ width: "15rem", height: "15rem" }}
        />
        <input type="file" name="image" onChange={handleDataChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
