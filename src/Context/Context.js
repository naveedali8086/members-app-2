import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import {useNavigate} from "react-router-dom";

const Context = createContext();
const AccountContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const getSession = async () => {
    return await new Promise( (resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession( (error, session) => {
          if (error) {
            reject()
          } else {
            resolve(session)
          }
        })
      } else {
        console.log('user was not found')
        reject();
      }
    })
  }
  useEffect(() => {
    getSession()
      .then((session) => {
        console.log("Session:", session);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log("Error getting session:", error);
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
      setIsAuthenticated(false);
      setIsLogin(false)
      navigate('/')
    } else {
      console.log('Logging out failed, please try again')
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
