import App from "../App";
import { Home, LogIn, NotFound, NewUser } from "../pages";
import { userRoutes } from "./userRoutes";

const appRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> }, // Render Home component when URL is '/'
      { path: "login", element: <LogIn /> },
      { path: "register", element: <NewUser /> },
      ...userRoutes,
    ],
  },
];

// Create & Export router as an instantiated object
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter(appRoutes);
