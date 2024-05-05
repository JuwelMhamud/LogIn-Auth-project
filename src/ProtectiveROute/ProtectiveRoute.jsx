import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Components/AuthProvider/AuthProvider";

const ProtectiveRoute = ({ children }) => {
  console.log(children);
  // step-1 : Grab the location where user want to go
  const location = useLocation();
  console.log(location);

  // IF user is loggedIn than show Children page otherwise don't.
  const { LogInPerson , loading} = useContext(authContext);
  if(loading){
    return <span className="loading loading-infinity loading-lg"></span>
  }
  
  if (LogInPerson) {
    return children;
  }
  
  // step-2 : pass the location as a state to  login page
  return <Navigate to="/login" state={location} />;

  
};

export default ProtectiveRoute;
