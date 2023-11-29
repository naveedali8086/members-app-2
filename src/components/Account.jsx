import React, {useState} from "react";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {FaRegEyeSlash} from "react-icons/fa";
import UserPool from "../userpool";

const Account = () => {
    const [show, setShow] = useState("login");
    const [error, setError] = useState("");
    const [inputType, setInputType] = useState({
        password: "password",
        password2: "password",
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
    });

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password === formData.password2) {
            UserPool.signUp(
                formData.email,
                formData.password,
                [
                    {
                        Name: "name",
                        Value: formData.name,
                    },
                    {
                        Name: "phone_number",
                        Value: formData.phone,
                    },
                ],
                null,
                (err, data) => {
                    if (err) {
                        setError(err.message);
                    } else {
                        console.log("Successfully signed up:", data);
                        if (data.success) {
                            setFormData({
                                email: "",
                                password: "",
                                password2: "",
                                name: "",
                                phone: "",
                            });
                        }
                    }
                }
            );
        }
    };
    const ToggleInputType = (field) => {
        setInputType((prevInputType) => ({
            ...prevInputType,
            [field]: prevInputType[field] === "password" ? "text" : "password",
        }));
    };
    return (
        <div className="min-h-[100vh] flex justify-center items-center px-4">
            <div className="border-gray-300 border-4 rounded-md w-[40rem] shadow-md">
                <div className=" sm:flex font-bold text-xl">
                    <button
                        className={`${
                            show === "login"
                                ? "bg-white sm:border-t-4 border-cyan-700"
                                : "hidden sm:block"
                        }
                     ml-8 sm:ml-0  flex-1 py-2 bg-gray-100 `}
                        onClick={() => setShow("login")}
                    >
                        Sign In
                    </button>
                    <button
                        className={`${
                            show === "signup" ? "bg-white sm:border-t-4 border-cyan-700" : ""
                        } 
                    flex-1 py-2 bg-gray-100 hidden sm:block`}
                        onClick={() => setShow("signup")}
                    >
                        Create Account
                    </button>
                </div>
                <p className="px-8 text-red-500">{error ? error : null}</p>
                <form
                    action=""
                    className={`${show === "signup" ? "block" : "hidden"} p-8`}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="1" className="font-semibold">
                        Name
                    </label>
                    <input
                        type="text"
                        onChange={onChange}
                        value={formData.name}
                        name="name"
                        id="1"
                        className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
                        placeholder="Enter Your Name"
                        required
                    />
                    <label htmlFor="2" className="font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        onChange={onChange}
                        value={formData.email}
                        name="email"
                        id="2"
                        className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
                        placeholder="Enter Your Email"
                        required
                    />
                    <label htmlFor="3" className="font-semibold">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={onChange}
                        name="phone"
                        id="3"
                        className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
                        placeholder="Enter Your Phone Number"
                        required
                    />
                    <label htmlFor="4" className="font-semibold">
                        Password
                    </label>
                    <div className="flex items-center border-2 border-gray-300 my-2 rounded-sm">
                        <input
                            type={inputType.password}
                            onChange={onChange}
                            value={formData.password}
                            name="password"
                            id="4"
                            className="block  w-[100%] outline-none border-r-2  p-2"
                            placeholder="Password"
                            required
                        />
                        <button className="px-3 cursor-pointer">
                            {inputType.password !== "password" ? (
                                <MdOutlineRemoveRedEye
                                    onClick={() => ToggleInputType("password")}
                                />
                            ) : (
                                <FaRegEyeSlash onClick={() => ToggleInputType("password")}/>
                            )}
                        </button>
                    </div>
                    <label htmlFor="5" className="font-semibold">
                        Re-Password
                    </label>
                    <div className="flex items-center border-2 border-gray-300 my-2  rounded-sm">
                        <input
                            type={inputType.password2}
                            onChange={onChange}
                            value={formData.password2}
                            name="password2"
                            id="5"
                            className="block  w-[100%] outline-none border-r-2  p-2"
                            placeholder="Re-Password"
                            required
                        />
                        <button className="px-3 cursor-pointer">
                            {inputType.password2 !== "password" ? (
                                <MdOutlineRemoveRedEye
                                    onClick={() => ToggleInputType("password2")}
                                />
                            ) : (
                                <FaRegEyeSlash onClick={() => ToggleInputType("password2")}/>
                            )}
                        </button>
                    </div>
                    <input
                        type="submit"
                        className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2"
                        value="Create Account"
                        name=""
                        id="signUp"
                    />
                    <button
                        onClick={() => setShow("login")}
                        className="mt-2 text-cyan-700 sm:hidden"
                    >
                        Already Register?
                    </button>
                </form>

                <form
                    action=""
                    className={`${show === "login" ? "block" : "hidden"} p-8`}
                >
                    <label htmlFor="6" className="font-semibold">
                        Email
                    </label>
                    <input
                        type="password"
                        name=""
                        id="6"
                        className="block my-2 w-[100%] outline-none border-2 border-gray-300 rounded-sm p-2"
                        placeholder="Enter Your Email"
                        required
                    />
                    <label htmlFor="7" className="font-semibold">
                        Password
                    </label>
                    <div className="flex items-center border-2 border-gray-300 my-2  rounded-sm">
                        <input
                            type="email"
                            name=""
                            id="7"
                            className="block  w-[100%] outline-none border-r-2  p-2"
                            placeholder="Password"
                            required
                        />
                        <button className="px-3 cursor-pointer">
                            <MdOutlineRemoveRedEye/>
                        </button>
                    </div>
                    <input
                        type="submit"
                        className="w-[100%] bg-cyan-700 text-white font-semibold rounded-sm mt-2 py-2"
                        value="Sign In"
                        name=""
                        id="signIn"
                    />
                    <div className="flex justify-between sm:justify-center pt-8 text-cyan-700">
                        <button className="">Forget Your Password?</button>
                        <button
                            onClick={() => setShow("signup")}
                            className="block sm:hidden"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
