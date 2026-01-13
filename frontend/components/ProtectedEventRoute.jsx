import { Navigate, useParams } from "react-router-dom";

const ProtectedEventRoute = ({children}) => {
    const params = useParams();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"

    return params.id == '695cc46eadcc1eb4056188b2' || isLoggedIn ? children : <Navigate to='/events' replace/>
}

export default ProtectedEventRoute;