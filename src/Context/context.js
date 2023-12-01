import React, {createContext, useContext} from "react";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import Pool from "../userpool";

const Context = createContext();

const AccountContextProvider = ({children}) => {
    const getSession = () => {
    };

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
            < Context.Provider value={{authenticate}}>
                {children}
            </ Context.Provider>
        </>
    );
};

const Usecontext = () => {
    return useContext(Context)
}

export {AccountContextProvider, Usecontext};