import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/context";
// const AppProvider: React.FC<Props> = ({ children })

const ReuireAuth: React.FC<any> = ({ children }) => {
  const { stateContext } = useGlobalContext();
  const token = stateContext.token;
  const location = useLocation();
  return token !== "" ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
};

export default ReuireAuth;
