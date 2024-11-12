import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <>home</>,
    },
    {
      path: "/signup",
      element: <>signup</>,
    },
  ]);
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
