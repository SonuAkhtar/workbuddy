import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.scss";

//Pages
import ServiceAdd from "./pages/ServiceAdd/ServiceAdd";
import Homepage from "./pages/Homepage/Homepage";
import Service from "./pages/Service/Service";
import Services from "./pages/Services/Services";
import Login from "./pages/Login/Login";
import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Messages";
import MyServices from "./pages/MyServices/MyServices";
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
          path: "/serviceAdd",
          element: <ServiceAdd />,
        },
        {
          path: "/Services",
          element: <Services />,
        },
        {
          path: "/Service/:id",
          element: <Service />,
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
          path: "/myServices",
          element: <MyServices />,
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
