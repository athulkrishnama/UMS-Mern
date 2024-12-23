import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import AdminHome from "./Components/AdminHome/AdminHome";
import EditUser from './Components/EditUser/EditUser'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/admin",
      element: <AdminHome/>
    }
    ,
    {
      path:"/admin/login",
      element:<AdminLogin/>
    },{
      path:'/admin/edit',
      element:<EditUser/>
    }
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
