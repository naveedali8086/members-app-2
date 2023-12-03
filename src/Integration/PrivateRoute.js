import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, path }) => {
  return (
    <Route
      path={path}
      element={isAuthenticated ? <Component /> : <Navigate to="/accounts" />}
    />
  );
};

export default PrivateRoute;
