import { Navigate, useParams } from "react-router-dom";

const ProtectedEventRoute = ({children}) => {
    const params = useParams();
    return params.id == '695cc46eadcc1eb4056188b2' ? children : <Navigate to='/events' replace/>
}

export default ProtectedEventRoute;