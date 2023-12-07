import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { axiosInstance } from "../utils/Constants";
import {v4} from "uuid"
const PopUp = ({ setShowPopUp, showPopUp }) => {


  const [user, setUser] = useState({
    address: "",
    member_type: "",
    lastName: "",
    firstName: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const organisationOptions = ["GOLD", "SILVER"];

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = {};

    if (user.firstName === "") {
      message.requireFirstName = "FirstName is required";
    }
    if (user.lastName === "") {
      message.requireLastName = "LastName is required";
    }

    if (user.address === "") {
      message.requireAddress = "Address is required";
    }
    if (user.member_type === "") {
      message.requireMemberType = "Type must be one of";
    }
    if (Object.keys(message).length > 0) {
      setMessage(message);
    } else {
      setIsloading(true);
      const org = user?.org ?? '';
      const Query = `address=${user.address}&date_joined=${Date.now()}&member_type=${user.member_type}&name=${user.firstName+' '+user.lastName}&name=${org}`
      try {
        const res = await axiosInstance.post(`/add-member/?${Query}`)
        console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (message) {
      setMessage("");
    }
    if (error) {
      setError("");
    }
  }, [user]);
  console.log(message);
  return (
      <main id="content" role="main" className="m-auto mt-[6rem]">
        <div className=" bg-white rounded-xl shadow-lg px-10">
          <div className="flex justify-between px-4 pt-4">
            <div className='pr-4'>
              <h2 className="block text-2xl font-bold text-gray-800">
                Add New Member
              </h2>
            </div>
            <div  className='self-center'>
              <ImCross
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => setShowPopUp(!showPopUp)}
              />
            </div>
          </div>
          <div className="px-4 pb-4 ">
            <div className="mt-5">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-y-4 gap-x-8">
                  <div>
                    <label
                        htmlFor=" firstName"
                        className="block text-sm font-bold ml-1 mb-2 "
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <input
                          type="text"
                          id=" firstName"
                          name="firstName"
                          className="py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                          aria-describedby="firstName-error"
                          value={user.firstName}
                          onChange={onchange}
                      />
                    </div>
                    <p
                        className={`text-xs text-red-600 mt-2 ${
                            message.requireFirstName ? "" : "hidden"
                        }`}
                        id="firstName-error"
                    >
                      {message.requireFirstName}
                    </p>
                  </div>

                  <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-bold ml-1 mb-2 "
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                          aria-describedby="lastName-error"
                          value={user.lastName}
                          onChange={onchange}
                      />
                    </div>
                    <p
                        className={`text-xs text-red-600 mt-2 ${
                            message.requireLastName ? "" : "hidden"
                        }`}
                        id="firstName-error"
                    >
                      {message.requireLastName}
                    </p>
                  </div>

                  <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-bold ml-1 mb-2 "
                    >
                      Address
                    </label>
                    <div className="relative">
                      <input
                          type="text"
                          id="address"
                          name="address"
                          className="py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                          aria-describedby="address-error"
                          value={user.address}
                          onChange={onchange}
                          placeholder="Address"
                      />
                    </div>
                    <p
                        className={`text-xs text-red-600 mt-2 ${
                            message.requireAddress ? "" : "hidden"
                        }`}
                        id="firstName-error"
                    >
                      {message.requireAddress}
                    </p>
                  </div>

                  <div>
                    <div className="">
                      <label htmlFor="member_type" className="block text-sm font-bold ml-1 mb-2">
                        Member Type
                      </label>
                      <select
                          onChange={onchange}
                          id="member_type"
                          value={user.member_type}
                          name="member_type"
                          className={` ${
                              user.member_type ? "text-black" : "text-[#a9a9a9]"
                          } py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm`}
                          aria-describedby="member_type-error"
                      >
                        <option disabled value="" className="text-[#a9a9a9]">
                          Please choose one option
                        </option>

                        {organisationOptions.map((option, index) => {
                          return (
                              <option
                                  value={option}
                                  className="text-black"
                                  key={index}
                              >
                                {option}
                              </option>
                          );
                        })}
                      </select>
                    </div>
                    <p
                        className={`text-xs text-red-600 mt-2 ${
                            message.requireMemberType ? "" : "hidden"
                        }`}
                        id="firstName-error"
                    >
                      { message.requireMemberType}
                    </p>
                  </div>

                  <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Add member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
  );
};

export default PopUp;
