import React from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedLoginRoute = ({children}) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';
    const userId = localStorage.getItem('myEventsIq_user_id');

  return (
    <div>
        {
            isLoggedIn ? <Navigate to={`/${userId}/events`}></Navigate>: children 
        }
    </div>
  )
}

export default ProtectedLoginRoute