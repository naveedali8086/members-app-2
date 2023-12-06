import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/Constants";
import { Usecontext } from "../Context/Context";

const Userdetail = () => {
  const { isAuthenticated } = Usecontext();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { memberid } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account");
    }
    const getUsers = async () => {
      try {
        setIsloading(true);
        const res = await axiosInstance.get(`/get-list/?memberid=${memberid}`);
        setUser(res.data)
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    getUsers();
  }, []);
  return <div>userdetail</div>;
};

export default Userdetail;
