import React, {useState} from "react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import {FaRegEyeSlash} from "react-icons/fa";

const Login = ({goToSection}) => {

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = new CognitoUser({
            Username: formData.email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: formData.email,
            Password: formData.password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("onSuccess: ", data);
                setFormData({
                    email: "",
                    password: "",
                });
            },
            onFailure: (err) => {
                setError(err.message);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired: ", data);
            }
        })

    };

    return (
        <>
            <p className="px-8 text-red-500">{error ? error : null}</p>

            <form
                className="p-8"
                onSubmit={handleSubmit}
            >
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
                        type={showPassword ? 'text' : 'password'}
                        onChange={onChange}
                        value={formData.password}
                        className="block  w-[100%] outline-none border-r-2  p-2"
                        placeholder="Password"
                        required
                    />
                    <button className="px-3 cursor-pointer">
                        {
                            showPassword ? (
                                <MdOutlineRemoveRedEye
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <FaRegEyeSlash onClick={() => setShowPassword(true)}/>
                            )
                        }
                    </button>
                </div>

                <input
                    type="submit"
                    className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2"
                    value="Sign In"
                />
                <div className="flex justify-between sm:justify-center pt-8 text-cyan-700">
                    <button onClick={() => goToSection("forgot-password")}>Forget Your Password?</button>
                    <button
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
