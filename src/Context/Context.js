import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import {useNavigate} from "react-router-dom"
import Pool from "../UserPool";

const Context = createContext();

const AccountContextProvider = ({ children }) => {
    // const naviagte = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session:", session);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error getting session:", error);
        // naviagte("/accounts")
        // Handle the error, you might want to redirect to a login page or do other actions.
      });
  }, [isLogin]);

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
          setIsLogin(true);
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
      setIsAuthenticated(false)
    }
  }
  return (
    <>
      <Context.Provider value={{ authenticate, getSession , logout ,isAuthenticated}}>
        {children}
      </Context.Provider>
    </>
  );
};

const Usecontext = () => {
  return useContext(Context);
};

export { AccountContextProvider, Usecontext };
