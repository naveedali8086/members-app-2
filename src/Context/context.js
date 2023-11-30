import React, { useState, createContext, useContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../userpool";

const Context = createContext();

const AccountContextProvider = ({ children }) => {
  const getSession = () => {};

    const authenticate = async (Username, Password) => {
      return await new Promise((resolve, reject) =>{
          const user = new CognitoUser({
              Username,
              Pool,
            });
            const authDetailes = new AuthenticationDetails({
              Username,
              Password,
            });
            user.authenticateUser(authDetailes, {
              onSuccess: (data) => {
                resolve(data);
              },
              onFailure: (err) => {
                reject(err);
              },
              newPasswordRequired: (data) => {
                resolve(data)
              },
            });
      })

    };


  return (
    <>
      < Context.Provider value={{ authenticate }}>
        {children}
      </ Context.Provider>
    </>
  );
};

const Usecontext = ()=>{
    return useContext(Context)
}

export  {AccountContextProvider , Usecontext};