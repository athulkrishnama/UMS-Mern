import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <></>,
    },
    {
      path: "/signup",
      element: <></>,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
