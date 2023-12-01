import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import UserPool from "../userpool";
import { RiLoader4Line } from "react-icons/ri";
const Signup = ({ goToSection }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handle1 = () => {
    UserPool.signUp(
      formData.email,
      formData.password,
      [
        {
          Name: "name",
          Value: formData.name,
        },
        {
          Name: "email",
          Value: formData.email,
        },
        {
          Name: "phone_number", // This is the attribute name for the phone number
          Value: formData.phone, // Use the phone number from your form data
        },
      ],
      null,
      (err, data) => {
        if (err) {
          setError(err.message);
        } else {
          console.log("Successfully signed up:", data);
          if (data) {
            goToSection("login");
            setFormData({
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            });
          }
        }
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let message = {};
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (formData.name === "") {
      message.requireName = "Name is required";
    }
    if (formData.email === "") {
      message.requireEmail = "Email is required";
    }
    if (formData.password === "") {
      message.requirePassword = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      message.requirePassword =
        "Password must contain at least 8 characters, 1 number, 1 special character, 1 uppercase letter, and 1 lowercase letter";
    }
    if (formData.password === "") {
      message.requireConfirmPassword = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      message.passwordNotMatch = "Password is not match";
    }
    if (Object.keys(message).length > 0) {
      setMessage(message);
    } else {
      setIsLoading(true);
      handle1();
    }
  };

  useEffect(() => {
    if (message) {
      setMessage("");
    }
    if (error) {
      setError("");
    }
  }, [formData]);
  return (
    <>
      <p className="px-8 text-red-500">{error ? error : null}</p>
      <form className="p-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={onChange}
          value={formData.name}
          className="block mt-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
          placeholder="Enter Your Name"
        />
        <p className="text-xs text-red-500 mb-2">{message?.requireName}</p>
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={onChange}
          value={formData.email}
          className="block mt-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
          placeholder="Enter Your Email"
        />
        <p className="text-xs text-red-500 mb-2">{message?.requireEmail}</p>
        <label htmlFor="phone" className="font-semibold">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
          placeholder="Enter Your Phone Number"
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <div className="flex items-center border-2 border-gray-300 mt-2 rounded-sm">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={formData.password}
            className="block  w-[100%] outline-none border-r-2  p-2"
            placeholder="Password"
          />
          <button className="px-3 cursor-pointer" type="button">
            {showPassword ? (
              <MdOutlineRemoveRedEye  type="button" onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash  type="button" onClick={() => setShowPassword(true)} />
            )}
          </button>
        </div>
        <p className="text-xs text-red-500 mb-2">{message?.requirePassword}</p>
        <label htmlFor="confirmPassword" className="font-semibold">
          Re-Password
        </label>
        <div className="flex items-center border-2 border-gray-300 mt-2  rounded-sm">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={formData.confirmPassword}
            className="block  w-[100%] outline-none border-r-2  p-2"
            placeholder="Re-Password"
          />
          <button className="px-3 cursor-pointer" type="button">
            {showPassword ? (
              <MdOutlineRemoveRedEye type="button" onClick={() => setShowPassword(false)} />
            ) : (
              <FaRegEyeSlash type="button" onClick={() => setShowPassword(true)} />
            )}
          </button>
        </div>
        <p className="text-xs text-red-500 mb-2">
          {message.requireConfirmPassword
            ? message.requireConfirmPassword
            : message.passwordNotMatch
            ? message.passwordNotMatch
            : null}
        </p>
        <button
          type="submit"
          className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer  flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading && <RiLoader4Line className="animate-spin" />}
          {isLoading ? "Creating Account" : "Create Account"}
        </button>

        <button
          onClick={() => goToSection("login")}
          className="mt-2 text-cyan-700 sm:hidden"
        >
          Already Register?
        </button>
      </form>
    </>
  );
};

export default Signup;
