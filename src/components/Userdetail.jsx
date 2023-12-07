import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/Constants";
import { Usecontext } from "../Context/Context";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Spinner from "./Loader";

const Userdetail = () => {
  const { isAuthenticated } = Usecontext();
  const navigate = useNavigate();
  const billingAddressTextareaRef = useRef(null);
  const shippingAddressTextareaRef = useRef(null);
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { memberid } = useParams();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonSize = isSmallScreen ? "small" : "large";

  const adjustTextareaHeight = (textareaRef) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const content = textarea.value;
      const formattedContent = content.replace(/, /g, "\n");
      textarea.value = formattedContent;
      const wordsPerRow = 3;
      const wordCount = formattedContent.split(/\s+/).length;
      const rowCount = Math.ceil(wordCount / wordsPerRow);
      textarea.rows = rowCount;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account");
    }
    const getUsers = async () => {
      try {
        setIsloading(true);
        const res = await axiosInstance.get(`/get-list/?memberid=${memberid}`);
        setUser(res.data.Item);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    getUsers();
  }, [isAuthenticated, memberid]);

  useEffect(() => {
    adjustTextareaHeight(billingAddressTextareaRef);
    adjustTextareaHeight(shippingAddressTextareaRef);
  }, [user]);

  return (
    <main className="min-h-[100vh]  bg-gray-100">
      <header className="px-2 py-2 bg-[#223A5E] flex items-center justify-between">
        <Button
          size={buttonSize}
          variant="contained"
          onClick={() => navigate("/users")}
          style={{ backgroundColor: "#ffffff", color: "#000000" }}
          startIcon={<ArrowBackIosIcon style={{ color: "#24FDF7" }} />}
        >
          Back To People
        </Button>
        <p className="font-bold text-xl italic text-white ">Status</p>
      </header>
      {isLoading ? (
        <span className=" h-[100vh] flex justify-center items-center">
          <Spinner />
        </span>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="overflow-x-scroll mt-8">
          <div className="grid grid-cols-4 min-w-[60rem] gap-4 sm:gap-8 px-2">
            <aside className="border-2 border-[#BCC7CC] bg-white   ">
              <header className="bg-[#162235] p-4 text-lg font-bold text-white">
                Person
              </header>
              <div className="p-4 grid gap-y-2">
                <p className="font-bold  sm:text-xl">First Name</p>
                <input
                  className="w-[100%] block border-none outline-none text-xs sm:text-base "
                  type="text"
                  name=""
                  id=""
                  value={user?.name?.S}
                  readOnly
                />
                <p className="font-bold sm:text-xl">Last Name</p>
                <input
                  className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                  type="text"
                  name=""
                  id=""
                  readOnly
                />
                <p className="font-bold sm:text-xl">Organization</p>
                <input
                  className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                  type="text"
                  name=""
                  id=""
                  value={user?.org?.S}
                  readOnly
                />
                <p className="font-bold sm:text-xl">Type</p>
                <input
                  className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                  type="text"
                  name=""
                  id=""
                  value={user?.member_type?.S}
                  readOnly
                />
                <p className="font-bold sm:text-xl">Email</p>
                <input
                  className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                  type="text"
                  name=""
                  id=""
                  readOnly
                />
                <p className="font-bold sm:text-xl">Work Phones</p>
                <input
                  className="w-[100%] block border-none outline-none  text-xs sm:text-base"
                  type="text"
                  name=""
                  id=""
                  readOnly
                />
                <p className="font-bold sm:text-xl">Billing Address</p>
                <textarea
                  className=" block border-none outline-none  text-xs sm:text-base"
                  name=""
                  id=""
                  readOnly
                  ref={billingAddressTextareaRef}
                  onChange={() =>
                    adjustTextareaHeight(billingAddressTextareaRef)
                  }
                  value={user?.address?.S}
                  style={{ resize: "none" }}
                ></textarea>
                <p className="font-bold sm:text-xl">Shipping Address</p>
                <textarea
                  className=" block border-none outline-none  text-xs sm:text-base"
                  name=""
                  id=""
                  readOnly
                  ref={shippingAddressTextareaRef}
                  onChange={() =>
                    adjustTextareaHeight(shippingAddressTextareaRef)
                  }
                  value={user?.address?.S}
                  style={{ resize: "none" }}
                ></textarea>
              </div>
            </aside>
            <article className="border-2  border-[#BCC7CC] col-span-3 bg-white">
              <header className="p-4 text-lg font-bold border-b-2 border-[#BCC7CC] bg-gray-100 ">
                Related Quotes
              </header>
            </article>
          </div>
        </div>
      )}
    </main>
  );
};
export default Userdetail;
