import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./components/navbar/Navbar";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";
import Footer from "./components/footer/Footer";
import {
  AddGig,
  ErrorPage,
  GigPage,
  Gigs,
  Home,
  Login,
  MyGigs,
  Orders,
  Payment,
  Register,
  Success,
} from "./pages";

const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });

  const Layout = () => {
    return (
      <Provider store={store}>
        <div className="layout">
          {isMobile ? <MobileNavbar /> : <Navbar />}
          <Outlet />
          <Footer />
        </div>
      </Provider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gigs/:id",
          element: <GigPage />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <AddGig />,
        },

        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/payment/:id",
          element: <Payment />,
        },
        {
          path: "/success",
          element: <Success />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
