import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error/Error";
import Main from "../layout/Main";
import Add from "../components/Student/Add";
import Manage from "../components/Student/Manage";

export const routes = createBrowserRouter([
  {
    errorElement: <Error></Error>,
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Add></Add>,
      },
      {
        path: "/manage",
        element: <Manage></Manage>,
      },
    ],
  },
]);
const Routers = () => {
  return <div></div>;
};

export default Routers;
