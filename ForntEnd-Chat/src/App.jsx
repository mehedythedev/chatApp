
 import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { BASE_URL } from "./main";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";
import HomePage from "./components/HomePage";
import Signup from "./components/SignUp";
import Login from "./components/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`https://chat-app-backend-eight-eta.vercel.app/`, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
