import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { BASE_URL } from "..";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://chat-app-backend-eight-eta.vercel.app/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className="max-w-md w-full mx-auto p-4 sm:p-6 md:p-8">
    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-500 text-center mb-4">Login</h1>
      <form onSubmit={onSubmitHandler} action="">
        <div>
          <label className="label p-1 sm:p-2">
            <span className="text-base text-white sm:text-lg label-text">Username</span>
          </label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full input input-bordered h-10 sm:h-12"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label className="label p-1 sm:p-2">
            <span className="text-base text-white sm:text-lg label-text">Password</span>
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full input input-bordered h-10 sm:h-12"
            type="password"
            placeholder="Password"
          />
        </div>
        <p className="text-center my-2 text-sm text-white sm:text-base">
          Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
        </p>
        <div>
          <button
            type="submit"
            className="btn btn-block bg-indigo-500 hover:bg-indigo-600 text-white btn-sm sm:btn-md mt-2 border border-indigo-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Login;
