import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import Signup from "./Components/Signup/Signup";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
