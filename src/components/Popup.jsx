import React, { useState, useEffect } from "react";
import { ImCross } from "react-icons/im";
import { axiosInstance } from "../utils/Constants";
import Spinner from "./Loader";
const intialState = {
  address: "",
  member_type: "",
  lastName: "",
  firstName: "",
  joined_at: "",
  expired_at: "",
  org: ""
}
const PopUp = ({ setShowPopUp, showPopUp, getmembers }) => {
  const [user, setUser] = useState(intialState);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const typeOptions = ["GOLD", "SILVER"];
  const organisationOptions = ["Sole-trader/Individual", "InSquare Fit"];

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
      message.requireMemberType = "Member type is required";
    }
    if (user.org === "") {
      message.requireOrganization = "Organization is required"
    }
    if (user.joined_at === "") {
      message.requireJoined_At = "Joined date is required";
    }
    if (user.expired_at === "") {
      message.requireExpired_At = "Expired date is required";
    }
    if (Object.keys(message).length > 0) {
      setMessage(message);
    } else {
      setIsloading(true);
      const Query = `address=${user.address}&date_joined=${user.joined_at}&expiry=${user.expired_at}&member_type=${user.member_type}&name=${user.firstName + ' ' + user.lastName}&org=${user.org}`
      try {
        const res = await axiosInstance.post(`/add-member/?${Query}`)
        console.log(res.data);
        if (res.status === 200) {
          await getmembers()
          setUser(intialState)
          return setShowPopUp(!showPopUp)
        }
      }
      catch (err) {
        console.log(err);
        setError(err.message);
      }
      finally {
        setIsloading(false);
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
  }, [user , showPopUp]);
  return (
      <>


        <main id="content" role="main" className="mx-auto   rounded-md   max-h-[50vh] shadow-sm shadow-white		 overflow-auto  mt-[2rem] sm:mt-[6rem] w-[100%]   max-w-[40rem]  ">
          {
              isLoading && <span className=" h-[100vh] flex justify-center items-center">
            <Spinner />
          </span>
          }

        <div className=" bg-white rounded-xl shadow-lg ">
          <p
            className={`text-red-600 p-2 ${error ? "" : "hidden"
              }`}
          >
            {error}
          </p>
          <div className="flex justify-between items-center px-4 pt-4">

            <div className='pr-4'>
              <h2 className="block text-2xl font-bold text-gray-800">
                Add New Member
              </h2>
            </div>
            <div>
              <ImCross
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setShowPopUp(!showPopUp)}
              />
            </div>
          </div>
          <div className="px-4 pb-4 ">
            <div className="mt-5">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid  sm:grid-cols-2 sm:gap-4 ">
                  <div>
                    <label
                      htmlFor=" firstName"
                      className="block text-sm font-bold ml-1 sm:mb-2 "
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id=" firstName"
                        name="firstName"
                        className="py-2 sm:py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                        aria-describedby="firstName-error"
                        value={user.firstName}
                        onChange={onchange}
                        placeholder="First Name"
                      />
                    </div>
                    <p
                      className={`text-xs text-red-600 mt-2 ${message.requireFirstName ? "" : "hidden"
                        }`}
                      id="firstName-error"
                    >
                      {message.requireFirstName}
                    </p>
                  </div>

                    <div>
                      <label
                          htmlFor="lastName"
                          className="block text-sm font-bold ml-1 sm:mb-2 "
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="py-2 sm:py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                            aria-describedby="lastName-error"
                            value={user.lastName}
                            onChange={onchange}
                            placeholder="Last Name"
                        />
                      </div>
                      <p
                          className={`text-xs text-red-600 mt-2 ${message.requireLastName ? "" : "hidden"
                          }`}
                          id="lastName-error"
                      >
                        {message.requireLastName}
                      </p>
                    </div>



                  <div className="">
                    <label
                      htmlFor="joined_at"
                      className="block text-sm font-bold ml-1 sm:mb-2 "
                    >
                      Joined Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="joined_at"
                        name="joined_at"
                        className={` ${user.joined_at ? "text-black" : "text-[#a9a9a9]"} py-2 sm:py-3 px-4  block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm`}
                        aria-describedby="joined_at-error"
                        value={user.joined_at}
                        onChange={onchange}
                        placeholder="Date"
                      />
                    </div>
                    <p
                      className={`text-xs text-red-600 mt-2 ${message.requireJoined_At ? "" : "hidden"
                        }`}
                      id="joined_at-error"
                    >
                      {message.requireJoined_At}
                    </p>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="expired_at"
                      className="block text-sm font-bold ml-1 sm:mb-2 "
                    >
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="expired_at"
                        name="expired_at"
                        className={` ${user.expired_at ? "text-black" : "text-[#a9a9a9]"} py-2 sm:py-3 px-4  block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm`}
                        aria-describedby="expired_at-error"
                        value={user.expired_at}
                        onChange={onchange}
                      />
                    </div>
                    <p
                      className={`text-xs text-red-600 mt-2 ${message.requireExpired_At ? "" : "hidden"
                        }`}
                      id="expired_at-error"
                    >
                      {message.requireExpired_At}
                    </p>
                  </div>

                    <div className="">
                      <div className="">
                        <label htmlFor="member_type" className="block text-sm font-bold ml-1 sm:mb-2">
                          Member Type
                        </label>
                        <select
                            onChange={onchange}
                            id="member_type"
                            value={user.member_type}
                            name="member_type"
                            className={` ${user.member_type ? "text-black" : "text-[#a9a9a9]"
                            } py-2 sm:py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm`}
                            aria-describedby="member_type-error"
                        >
                          <option disabled value="" className="text-[#a9a9a9]">
                            Choose One
                          </option>

                          {typeOptions.map((option, index) => {
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
                          className={`text-xs text-red-600 mt-2 ${message.requireMemberType ? "" : "hidden"
                          }`}
                          id="firstName-error"
                      >
                        {message.requireMemberType}
                      </p>
                    </div>

                    <div className="">
                      <div className="">
                        <label htmlFor="org" className="block text-sm font-bold ml-1 sm:mb-2">
                          Organization
                        </label>
                        <select
                            onChange={onchange}
                            id="org"
                            value={user.org}
                            name="org"
                            className={` ${user.org ? "text-black" : "text-[#a9a9a9]"
                            } py-2 sm:py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm`}
                            aria-describedby="org-error"
                        >
                          <option disabled value="" className="text-[#a9a9a9]">
                            Choose One
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
                          className={`text-xs text-red-600 mt-2 ${message.requireOrganization ? "" : "hidden"
                          }`}
                          id="org-error"
                      >
                        {message.requireOrganization}
                      </p>
                    </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-bold ml-1 sm:mb-2 "
                    >
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="py-2 sm:py-3 px-4 block w-full outline-none border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                        aria-describedby="address-error"
                        value={user.address}
                        onChange={onchange}
                        placeholder="Address"
                      />
                    </div>
                    <p
                      className={`text-xs text-red-600 mt-2 ${message.requireAddress ? "" : "hidden"
                        }`}
                      id="firstName-error"
                    >
                      {message.requireAddress}
                    </p>
                  </div>



                    <button
                        type="submit"
                        className="py-2 sm:py-3 mt-2 sm:mt-0 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Add member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </>
  );
};

export default PopUp;
