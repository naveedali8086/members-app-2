import React, { useState, useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import Pool from "../userpool";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const getUser = () => {
    return new CognitoUser({
      Username: email,
      Pool,
    });
  };
  const sendCode = (event) => {
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
      },
    });
  };
  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords are not the same");
      setError("Passwords are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        navigate("/");
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
        setError(err.message);
      },
    });
  };
  useEffect(() => {
    setError("");
  }, [password , confirmPassword , code , stage]);
  return (
    <div className="min-h-[100vh] flex justify-center items-center px-4">
      <div className="border-gray-300 border-4 rounded-md w-[40rem] p-8 shadow-md">
        <p className="text-red-500">{error ? error : null}</p>
        {stage === 1 && (
          <form onSubmit={sendCode}>
            <input
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              id="email"
              value={email}
              placeholder="Please enter your email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              type="submit"
              value="Send verification code"
              className="w-[100%] cursor-pointer bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2"
            />
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={resetPassword}>
            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              placeholder="Enter your code"
              required
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              placeholder="New your password"
              required
            />
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
              placeholder="Re-New Password"
              required
            />
            <input
              type="submit"
              value="Change Password"
              className="w-[100%] cursor-pointer bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
