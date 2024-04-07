import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: ReactNode;
  user: boolean;
  redirect?: string;
};

const Protected = ({ children, user, redirect = "/login" }: ProtectedProps) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }
  return children;
};

export default Protected;
