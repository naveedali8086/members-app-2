import React, {useEffect, useState} from "react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {FaRegEyeSlash} from "react-icons/fa";
import UserPool from "../UserPool";
import "react-phone-input-2/lib/style.css";

const Signup = ({goToSection}) => {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        password: "",
        confirmPassword: "",
    });

    const organizationOptions = [
        'Sole-trader/Individual',
        'InSquare Fit'
    ];

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                {
                    Name: "custom.organization",
                    Value: formData.organization,
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
                            organization: "",
                            password: "",
                            confirmPassword: "",
                        });
                    }
                }
            }
        );
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
                <label htmlFor="name" className="font-semibold">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={onChange}
                    value={formData.name}
                    className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
                    placeholder="Enter Your Name"
                    required
                />
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
                    required
                />

                <div className=''>
                    <label htmlFor="organization" className="font-semibold">
                        Organization
                    </label>
                    <select onChange={onChange} required
                            name='organization'
                            className='block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2'>
                        <option>Please choose one option</option>
                        {organizationOptions.map((option, index) => {
                            return (
                                <option key={index}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <label htmlFor="password" className="font-semibold">
                    Password
                </label>
                <div className="flex items-center border-2 border-gray-300 my-2 rounded-sm">
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
                    <button className="px-3 cursor-pointer">
                        {showPassword ? (
                            <MdOutlineRemoveRedEye onClick={() => setShowPassword(false)}/>
                        ) : (
                            <FaRegEyeSlash onClick={() => setShowPassword(true)}/>
                        )}
                    </button>
                </div>
                <label htmlFor="confirmPassword" className="font-semibold">
                    Re-Password
                </label>
                <div className="flex items-center border-2 border-gray-300 my-2  rounded-sm">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onChange={onChange}
                        value={formData.confirmPassword}
                        className="block  w-[100%] outline-none border-r-2  p-2"
                        placeholder="Re-Password"
                        required
                    />
                    <button className="px-3 cursor-pointer">
                        {showPassword ? (
                            <MdOutlineRemoveRedEye onClick={() => setShowPassword(false)}/>
                        ) : (
                            <FaRegEyeSlash onClick={() => setShowPassword(true)}/>
                        )}
                    </button>
                </div>
                <input
                    type="submit"
                    className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2 cursor-pointer"
                    value="Create Account"
                />
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
