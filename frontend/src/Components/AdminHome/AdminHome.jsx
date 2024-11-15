import React, { useEffect, useState } from "react";
import { adminInstance } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/editUserSlice";
function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('')
  useEffect(() => {
    adminInstance("/getUsers")
      .then((data) => {
        console.log(data);
        setUsers([...data.data.users]);
      })
      .catch((err) => {
        console.log(err);
        navigate("/admin/login");
      });
  }, []);

  const deleteUser = async (userid) => {
    try {
      const response = await adminInstance.post("/deleteUser", { id: userid });
      setUsers([...response.data.users]);
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = (user) => {
    dispatch(setUser(user));
    navigate("/admin/edit");
  };

  const handleSearch = async()=>{
    try{
      const response = await adminInstance.post('/search', {search})
      
      setUsers(response.data.users)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <button onClick={handleSearch}>Search</button>
      {users.length ? (
        <table>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td onClick={() => editUser(item)}>edit</td>
              <td onClick={() => deleteUser(item._id)}>delete</td>
            </tr>
          ))}
        </table>
      ) : (
        <h1>NO user found</h1>
      )}
    </div>
  );
}

export default AdminHome;
