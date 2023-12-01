import React, {useState} from "react";
import Signup from "./Signup";
import Login from "./Login";

const Account = () => {

    const [section, setSection] = useState("login");

    const goToSection = (sectionName) => {
        setSection(sectionName);
    }

    const currentSection = section === 'login' ?
        <Login goToSection={goToSection}/> :
        <Signup goToSection={goToSection}/>;

    return (
        <div className="min-h-[100vh] flex justify-center items-center px-4">
            <div className="border-gray-300 border-4 rounded-md w-[35rem] shadow-md my-4">
                <div className="sm:flex font-bold text-xl">

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

                {currentSection}

            </div>
        </div>
    );
};

export default Account;
