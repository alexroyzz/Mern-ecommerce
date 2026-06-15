import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import AddProducts from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/CheckoutAddress";
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/productdetails/:id", element: <ProductDetails /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProducts /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout/address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
