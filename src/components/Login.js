import React, { useState , useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { Usecontext } from "../Context/context";
import { useNavigate } from "react-router-dom";

const Login = ({ goToSection }) => {
  const navigate = useNavigate();
  const { authenticate } = Usecontext();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     UserPool.signUp(
  //       formData.email,
  //       formData.password,
  //       [
  //         {
  //           Name: "name",
  //           Value: formData.name,
  //         },
  //         {
  //           Name: "email",
  //           Value: formData.email,
  //         },
  //       ],
  //       null,
  //       (err, data) => {
  //         if (err) {
  //           setError(err.message);
  //         } else {
  //           console.log("Successfully signed in:", data);
  //           if (data.success) {
  //             setFormData({
  //               email: "",
  //               password: "",
  //             });
  //           }
  //         }
  //       }
  //     );
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await authenticate(formData.email, formData.password);
      if (data) {
        console.log("on success:", data);
        navigate("/users");
        setFormData({ email: "", password: "" });
      }
    } catch (err) {
      setError(err.message);
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
              <MdOutlineRemoveRedEye onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash onClick={() => setShowPassword(true)} />
            )}
          </button>
        </div>

        <input
          type="submit"
          className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer"
          value="Sign In"
        />
        <div className="flex justify-between sm:justify-center pt-8 text-cyan-700">
          <button className="" type="button" onClick={()=>{navigate('/forgot-password')}}>Forgot Your Password?</button>
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
