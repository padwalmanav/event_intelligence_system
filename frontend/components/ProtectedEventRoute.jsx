import { Navigate, useParams } from "react-router-dom";

const ProtectedEventRoute = ({children}) => {
    const {userId, eventId} = useParams();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === "true"

    return eventId == '695cc46eadcc1eb4056188b2' || isLoggedIn ? children : <Navigate to={`/1/events`} replace/>
}

export default ProtectedEventRoute;