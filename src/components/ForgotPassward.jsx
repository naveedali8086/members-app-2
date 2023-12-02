import React, { useEffect, useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import Pool from "../UserPool";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import { RiLoader4Line } from "react-icons/ri";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState({
    password: "password",
    password2: "password",
  });

  const getUser = () => {
    return new CognitoUser({
      Username: email,
      Pool,
    });
  };
  const sendCode = (event) => {
    setIsLoading(true);
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        setError(err.message);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setStage(2);
        setIsLoading(false);
      },
    });
  };
  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Password and Confirm Password does not match");
      setError("Password and Confirm Password does not match");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        navigate("/");
        setIsLoading(false);
        setCode("")
        setPassword("")
        setConfirmPassword("")
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        setError(err.message);
        setIsLoading(false);
      },
    });
  };
  const ToggleInputType = (field) => {
    setInputType((prevInputType) => ({
      ...prevInputType,
      [field]: prevInputType[field] === "password" ? "text" : "password",
    }));
  };
  useEffect(() => {
    setError("");
  }, [password, confirmPassword, code, stage]);
  return (
    <div className="min-h-[100vh] flex justify-center items-center px-4">
      <div className="border-gray-300 border-4 rounded-md w-[35rem] shadow-md">
        <div className="font-bold text-xl bg-gray-100 py-2 w-[100%] text-center">
          Reset Password
        </div>
        <p className="px-8 text-red-500">{error ? error : null}</p>
        {stage === 1 && (
          <form className="p-8" onSubmit={sendCode}>
            <input
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              id="email"
              value={email}
              placeholder="Please enter your email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button
              type="submit"
              className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer  flex justify-center items-center"
              disabled={isLoading}
            >
              Send verification code
              {isLoading && <RiLoader4Line className="animate-spin text-xl" />}
            </button>
          </form>
        )}

        {stage === 2 && (
          <form className="p-8" onSubmit={resetPassword}>
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              placeholder="Enter your code"
              required
            />

            <div className="flex items-center border-2 border-gray-300 my-2 rounded-sm">
              <input
                id="password1"
                name="password1"
                type={inputType.password}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block  w-[100%] outline-none border-r-2  p-2"
                placeholder="Password"
                required
              />
              <button className="px-3 cursor-pointer" type="button">
                {inputType.password !== "password" ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => ToggleInputType("password")}
                  />
                ) : (
                  <FaRegEyeSlash onClick={() => ToggleInputType("password")} />
                )}
              </button>
            </div>
            <div className="flex items-center border-2 border-gray-300 my-2 rounded-sm">
              <input
                id="password2"
                name="password2"
                type={inputType.password2}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="block  w-[100%] outline-none border-r-2  p-2"
                placeholder="Password"
                required
              />
              <button className="px-3 cursor-pointer" type="button">
                {inputType.password2 !== "password" ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => ToggleInputType("password2")}
                  />
                ) : (
                  <FaRegEyeSlash onClick={() => ToggleInputType("password2")} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer  flex justify-center items-center"
              disabled={isLoading}
            >
              Change Password
              {isLoading && <RiLoader4Line className="animate-spin text-xl" />}
            </button>
          </form>
        )}

        <div className="flex justify-center items-center mb-4 text-cyan-700 ">
          <button
            className=""
            type="button"
            onClick={() => {
              if (stage === 1) {
                navigate("/");
                setIsLoading(false);
              } else {
                setStage(1);
                setIsLoading(false);
              }
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
