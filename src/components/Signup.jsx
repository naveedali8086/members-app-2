// {
//   Name: "name",
//   Value: formData.name,
// },
// {
//   Name: "email",
//   Value: formData.email,
// },
// {
//   Name: "phone_number",
//   Value: formData.phone,
// },
// {
//   Name: "custom:organization",
//   Value: formData.organisation,
// },

import React, {useEffect, useState} from "react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {FaRegEyeSlash} from "react-icons/fa";
import UserPool from "../UserPool";
import {RiLoader4Line} from "react-icons/ri";

const Signup = ({ goToSection }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    password: "",
    confirmPassword: "",
  });
  const organisationOptions = ["Sole-trader/Individual", "InSquare Fit"];
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
            Name: "phone_number",
            Value: formData.phone,
          },
          {
            Name: "custom:organisation",
            Value: formData.organisation,
          },

        ],
        null,
        (err, data) => {
          if (err) {
            setError(err.message);
            setIsLoading(false);
          } else {
            console.log("Successfully signed up:", data);
            if (data) {
              goToSection("login");
              setIsLoading(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                organisation: "",
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
    if (formData.organisation === "") {
      message.requireOrgnization = "Organisation must";
    }
    if (formData.password === "") {
      message.requireConfirmPassword = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      message.passwordNotMatch = "Password is not match";
    }

    if (formData.phone) {
      if (!formData.phone.startsWith("04")) {
        message.phoneErr = 'Phone number must start with 04';
      } else if (isNaN(formData.phone)) {
        message.phoneErr = 'Phone number is not a valid';
      } else if (formData.phone.length !== 10) {
        message.phoneErr = 'phone number must have 10 digits'
      }
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
          <p className="text-xs text-red-500 mb-2">{message?.phoneErr}</p>
          <div className=''>
            <label htmlFor="organisation" className="font-semibold">
              Organisation
            </label>
            <select
                onChange={onChange}
                id="organisation"
                value={formData.organisation}
                name="organisation"
                className={` ${
                    formData.organisation ? "text-black" : "text-[#a9a9a9]"
                } block mt-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2`}
            >
              <option disabled value="" className="text-[#a9a9a9]">
                Please choose one option
              </option>
              {organisationOptions.map((option, index) => {
                return (
                    <option value={option} className="text-black" key={index}>
                      {option}
                    </option>
                );
              })}
            </select>
          </div>
          <p className="text-xs text-red-500 mb-2">
            {message?.requireOrgnization}
          </p>
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
            <button className="px-3 cursor-pointer" type="button" onClick={
              () => {
                setShowPassword(!showPassword)
              }
            }>
              {showPassword ? (<MdOutlineRemoveRedEye/>) : (<FaRegEyeSlash/>)}
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
            <button className="px-3 cursor-pointer" type="button" onClick={
              () => {
                setShowPassword(!showPassword)
              }
            }>
              {showPassword ? (<MdOutlineRemoveRedEye/>) : (<FaRegEyeSlash/>)}
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
            Creating Account
            {isLoading && <RiLoader4Line className="animate-spin text-xl" />}
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
