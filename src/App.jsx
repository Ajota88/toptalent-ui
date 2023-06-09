import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useGetUserLoggedQuery } from "./features/auth/authSlice";
import { useMediaQuery } from "react-responsive";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Navbar from "./components/navbar/Navbar";
import MobileNavbar from "./components/mobileNavbar/MobileNavbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import SellerRoutes from "./components/sellerRoutes/SellerRoutes";
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
  ProfilePage,
  LoadingPage,
} from "./pages";

const App = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const {
    data: user,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserLoggedQuery("", { refetchOnMountOrArgChange: true });

  const Layout = () => {
    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <div className="layout">
        {isMobile ? <MobileNavbar /> : <Navbar />}
        <Outlet />
        <Footer />
      </div>
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
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/mygigs",
          element: (
            <SellerRoutes>
              <MyGigs />
            </SellerRoutes>
          ),
        },
        {
          path: "/add",
          element: (
            <SellerRoutes>
              {" "}
              <AddGig />
            </SellerRoutes>
          ),
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
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/success",
          element: (
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          ),
        },
        {
          path: "/myprofile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
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
