
import { Navigate } from "react-router-dom";


const PrivateRoute= ({ children }) => {
  const userToken = localStorage.getItem("accessToken")
  if (!userToken || userToken === 'undefined') {
    return <Navigate to="/"  replace />;
  }
  
  return children;
};

export default PrivateRoute;
