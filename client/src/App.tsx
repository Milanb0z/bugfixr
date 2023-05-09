import { JSX } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import classes from "./app.module.scss";
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/dashboard/dashboard";
import BugDetails from "./pages/dashboard/variants/bugDetails/bugDetails";
import Bugs from "./pages/dashboard/variants/bugs/bugs";
import NewBug from "./pages/dashboard/variants/newBug/newBug";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "bugs/new",
        element: <NewBug />,
      },

      {
        path: "bugs/:id",
        element: <BugDetails />,
      },

      {
        path: "bugs/",
        element: <Bugs />,
      },
    ],
  },

  {
    path: "/login",
    element: <Auth />,
  },
]);

const App: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
