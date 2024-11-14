import React, { useEffect, useState } from "react";
import { adminInstance } from "../../axios/axios";
import { useNavigate } from "react-router-dom";
function AdminHome() {
    const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    adminInstance('/getUsers').then((data)=>{
        console.log(data)
        setUsers([...data.data.users])
    }).catch((err)=>{
        console.log(err)
        navigate('/admin/login')
    })
  })
  return (
    <div>
      {
      users.length?<table>
        {users.map((item,index)=><tr key={index}>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>edit</td>
            <td>delete</td>
        </tr>)}
      </table>:<h1>NO user found</h1>
      }
    </div>
  );
}

export default AdminHome;
