import React, {useState} from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Account = () => {

    const [section, setSection] = useState("login");

    const goToSection = (sectionName) => {
        setSection(sectionName);
    }

    return (
        <div className="min-h-[100vh] flex justify-center items-center px-4">
            <div className="border-gray-300 border-4 rounded-md w-[40rem] shadow-md">
                <div className=" sm:flex font-bold text-xl">

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

                </div>

                {section === 'login' ?
                    (<LogIn goToSection={goToSection}/>) :
                    (<SignUp goToSection={goToSection}/>)
                }

            </div>
        </div>
    );
};

export default Account;
