import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider} from "react-redux";
import store from "./store/store";
import Signup from "./Components/Signup/Signup";
import Home from "./Components/Home/Home";
import Login from './Components/Login/Login'
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path:"/login",
      element: <Login/>
    }
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
