import { useState } from "react";

// import { BASE_URL } from "..";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://chatapp-wq9g.onrender.com/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="max-w-xl w-full mx-auto p-2 sm:p-6 md:p-4" >
      <h1 className="text-4xl py-5 text-pretty text-indigo-300 font-bold ">Welcome to Mehedi's ChatFast</h1>
  <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
    <h1 className="text-2xl  text-indigo-100 sm:text-3xl font-bold text-center mb-4">Create An Account</h1>
    <form onSubmit={onSubmitHandler} action="">
      <div>
        <label className="label p-1 sm:p-2">
          <span className="text-base sm:text-lg text-gray-100 label-text">Full Name</span>
        </label>
        <input
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          className="w-full input input-bordered h-10 sm:h-12"
          type="text"
          placeholder="Full Name"
        />
      </div>
      <div>
        <label className="label p-1 sm:p-2">
          <span className="text-base sm:text-lg text-gray-100 label-text">Username</span>
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
          <span className="text-base sm:text-lg text-gray-100 label-text">Password</span>
        </label>
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full input input-bordered h-10 sm:h-12"
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <label className="label p-1 sm:p-2">
          <span className="text-base sm:text-lg text-gray-100 label-text">Confirm Password</span>
        </label>
        <input
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          className="w-full input input-bordered h-10 sm:h-12"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex items-center my-4">
        <div className="flex items-center mr-4">
          <p className="text-sm  text-gray-100 sm:text-base">Male</p>
          <input
            type="checkbox"
            checked={user.gender === "male"}
            onChange={() => handleCheckbox("male")}
            className=" checkbox checkbox-primary border border-gray-700 mx-2"
          />
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-100 sm:text-base">Female</p>
          <input
            type="checkbox"
            checked={user.gender === "female"}
            onChange={() => handleCheckbox("female")}
            className="checkbox checkbox-primary border border-gray-700 mx-2"
          />
        </div>
      </div>
      <p className="text-center text-gray-50 my-2 text-sm sm:text-base">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
      <div>
        <button
          type="submit"
          className="btn btn-block bg-sky-600 hover:bg-cyan-600 text-white btn-sm sm:btn-md mt-2 border border-indigo-700"
        >
          Signup
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default Signup;
