import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { Usecontext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import { RiLoader4Line } from "react-icons/ri";

const Login = ({ goToSection }) => {
  const navigate = useNavigate();
  const { authenticate } = Usecontext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsLoading(true);
      const data = await authenticate(formData.email, formData.password);
      if (data) {
        console.log("on success:", data);
        navigate("/users");
        setIsLoading(false);
        setFormData({ email: "", password: "" });
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [formData]);
  return (
    <>
      <p className="px-8 text-red-500">{error ? error : null}</p>

      <form className="p-8" onSubmit={handleSubmit}>
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={onChange}
          value={formData.email}
          className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
          placeholder="Enter Your Email"
          required
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>

        <div className="flex items-center border-2 border-gray-300 my-2  rounded-sm">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={formData.password}
            className="block  w-[100%] outline-none border-r-2  p-2"
            placeholder="Password"
            required
          />
          <button className="px-3 cursor-pointer" type="button">
            {showPassword ? (
              <MdOutlineRemoveRedEye
                type="button"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                type="button"
                onClick={() => setShowPassword(true)}
              />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer  flex justify-center items-center"
          disabled={isLoading}
        >
          Login
          {isLoading && <RiLoader4Line className="animate-spin text-xl" />}
        </button>
        <div className="flex justify-between sm:justify-center pt-8 text-cyan-700">
          <button
            className=""
            type="button"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={() => goToSection("signup")}
            className="block sm:hidden"
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
