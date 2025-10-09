import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const PrivateRoute = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/login" replace />;

export default PrivateRoute;
