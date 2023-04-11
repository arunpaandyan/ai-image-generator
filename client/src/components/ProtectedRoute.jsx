import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // user is not authenticated
    console.log("Redirecting");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
