import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
