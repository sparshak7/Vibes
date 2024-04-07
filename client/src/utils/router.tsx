import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { lazy } from "react";
import Protected from "../components/Protected.tsx";
const Home = lazy(() => import("../pages/Home.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const Chat = lazy(() => import("../pages/Chat.tsx"));
const Group = lazy(() => import("../pages/Group.tsx"));
const Register = lazy(() => import("../pages/Register.tsx"));
const InvalidPage = lazy(() => import("../pages/InvalidPage.tsx"));

let user = false;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: [
          <Protected user={user}>
            <Home />
          </Protected>,
        ],
      },
      {
        path: "/login",
        element: (
          <Protected user={!user} redirect="/">
            <Login />
          </Protected>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/chat/:chatID",
        element: (
          <Protected user={user}>
            <Chat />
          </Protected>
        ),
      },
      {
        path: "/group/:groupID",
        element: (
          <Protected user={user}>
            <Group />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <InvalidPage />
      }
    ],
  },
]);
