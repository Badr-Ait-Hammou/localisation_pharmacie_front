
import { Navigate } from "react-router-dom";
import { accountService } from "../service/accountService";

const ProtectedRoute = ({children}) => {

    if(!accountService.isLogged()){
        return <Navigate to="/"/>
    }

    return children
};

export default ProtectedRoute;

