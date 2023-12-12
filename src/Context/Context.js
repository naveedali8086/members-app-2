import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import { useNavigate } from "react-router-dom";

const Context = createContext();
const AccountContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    let storedValue = localStorage.getItem("idToken");
    return storedValue ? true : false;
  });

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((error, session) => {
          if (error) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        console.log("user was not found");
        reject();
      }
    });
  };
  const checkAuthentication = () => {
    const idToken = localStorage.getItem("idToken");
    const accessToken = localStorage.getItem("accessToken");
    if (idToken && accessToken) {
      setIsAuthenticated(true);
    }
  };

  // useEffect(() => {
  //   checkAuthentication();
  // }, [isLogin]);

  // Only run on initial mount
  // useEffect(() => {
  //   if(!isAuthenticated){
  //     getSession()
  //     .then((session) => {
  //       console.log("Session:", session);
  //       setIsAuthenticated(true);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting session:", error);
  //     });
  //   }

  // }, [isLogin]);
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          const { idToken, accessToken } = data;
          localStorage.setItem("idToken", idToken.jwtToken);
          localStorage.setItem("accessToken", accessToken.jwtToken);
          localStorage.setItem("loggedinAt", '');
          checkAuthentication();
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };
  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      navigate("/");
    } else {
      console.log("Logging out failed, please try again");
    }
  };
  console.log(isAuthenticated);
  return (
      <>
        <Context.Provider
            value={{ authenticate, getSession, logout, isAuthenticated }}
        >
          {children}
        </Context.Provider>
      </>
  );
};

const Usecontext = () => {
  return useContext(Context);
};

export { AccountContextProvider, Usecontext };
