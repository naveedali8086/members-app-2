import React from "react";
import { ImCross } from "react-icons/im";

const PopUp = () => {
  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6 ">
      <div className="mt-7 bg-white  rounded-xl shadow-lg ">
        <div className="p-4 ">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800  underline">
              Add New Member
            </h1>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-bold ml-1 mb-2 "
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      className="py-3 px-4 block w-full border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                      required
                      aria-describedby="first-name-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="first-name-error"
                  >
                    {" "}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-bold ml-1 mb-2 "
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      className="py-3 px-4 block w-full border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                      required
                      aria-describedby="last-name-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="last-name-error"
                  >
                    {" "}
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
                      className="py-3 px-4 block w-full border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                      required
                      aria-describedby="address-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="address-error"
                  >
                    {" "}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="member-type"
                    className="block text-sm font-bold ml-1 mb-2 "
                  >
                    Member Type
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="member-type"
                      name="member-type"
                      className="py-3 px-4 block w-full border-2 border-blue-200 rounded-md text-sm  shadow-sm"
                      required
                      aria-describedby="member-type-error"
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="member-type-error"
                  >
                    {" "}
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
