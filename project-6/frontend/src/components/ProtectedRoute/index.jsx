import { useVariable } from "../../globalVariables";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useVariable();
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login-register" />;
}

export default ProtectedRoute;
