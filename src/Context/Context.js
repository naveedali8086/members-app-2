import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
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
        user.getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });
            const token = session.getIdToken().getJwtToken();

            resolve({
              user,
              headers: {
                Authorization: token,
              },
              ...session,
              ...attributes,
            });
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
