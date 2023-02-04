import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Main from "../layout/Main";
import Add from "../components/Student/Add";
import Manage from "../components/Student/Manage";
import Signup from "../components/Signup/Signup";
import Signin from "../components/Signin/Signin";
import Privateroute from "./private/Privateroute";

export const routes = createBrowserRouter([
  {
    errorElement: <Error></Error>,
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <Privateroute>
            <Add></Add>
          </Privateroute>
        ),
      },
      {
        path: "/manage",
        element: (
          <Privateroute>
            <Manage></Manage>
          </Privateroute>
        ),
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
    ],
  },
]);
const Routers = () => {
  return <div></div>;
};

export default Routers;
