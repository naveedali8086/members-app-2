import React, {useState} from "react";
import Signup from "./Signup";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

const Account = () => {

    const [section, setSection] = useState("login");

    const goToSection = (sectionName) => {
        setSection(sectionName);
    }

    let currentSection;
    if (section === 'login') {
        currentSection = (<Login goToSection={goToSection}/>)
    } else if (section === 'signup') {
        currentSection = (<Signup goToSection={goToSection}/>)
    } else if (section === 'forgot-password') {
        currentSection = (<ResetPassword goToSection={goToSection}/>)
    }

    return (
        <div className="min-h-[100vh] flex justify-center items-center px-4">
            <div className="border-gray-300 border-4 rounded-md w-[40rem] shadow-md">
                <div className=" sm:flex font-bold text-xl">

                    {
                        section === 'forgot-password' ?
                            (<div className='bg-gray-100 py-2 w-[100%] text-center'>
                                Reset Password
                            </div>) :
                            (<>
                            <button
                                className={`${
                                    section === "login"
                                        ? "bg-white sm:border-t-4 border-cyan-700"
                                        : "hidden sm:block"
                                }
                     ml-8 sm:ml-0  flex-1 py-2 bg-gray-100 `}
                                onClick={() => goToSection("login")}
                            >
                                Sign In
                            </button>

                            <button
                                className={`${
                                    section === "signup" ? "bg-white sm:border-t-4 border-cyan-700" : ""
                                } 
                    flex-1 py-2 bg-gray-100 hidden sm:block`}
                                onClick={() => goToSection("signup")}
                            >
                                Create Account
                            </button>
                        </>)
                    }

                </div>
                {currentSection}
            </div>
        </div>
    );
};

export default Account;
