import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.scss";

//Pages
import Add from "./pages/Add/Add";
import Homepage from "./pages/Homepage/Homepage";
import Gig from "./pages/Gig/Gig";
import Gigs from "./pages/Gigs/Gigs";
import Login from "./pages/Login/Login";
import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Messages";
import MyGigs from "./pages/MyGigs/MyGigs";
import Orders from "./pages/Orders/Orders";
import Register from "./pages/Register/Register";

//Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Success from "./pages/Success/Success";
import Pay from "./pages/Pay/Pay";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/myGigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/pay/:id",
          element: <Pay />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
