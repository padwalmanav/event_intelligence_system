import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Events from './pages/Events'
import Onboarding from './pages/Onboarding'
import { Toaster } from 'react-hot-toast'
import EventDetails from './pages/EventDetails'
import "../styles.css"
import Signup from './pages/Signup'
import About from './pages/About'
import Login from './pages/Login'
import ProtectedEventRoute from './components/ProtectedEventRoute'
import ContactUs from './pages/ContactUs'
import ForgetPassword from "./pages/ForgetPassword"
import { createContext, useState } from 'react'
import ProtectedLoginRoute from "./components/ProtectedLoginRoute"

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    element:<Onboarding />,
    path:'/'
  },
  {
    path:'/:userId',
    children:[
      {
        path:'events',
        element:<Events/>
      },
      {
        path:'events/:eventId',
        element:
        <ProtectedEventRoute>
          <EventDetails/>
        </ProtectedEventRoute>
      }
    ]
  },
  {
    element:
    <ProtectedLoginRoute>
      <Signup/>
    </ProtectedLoginRoute>,
    path:'/signup'
  },
  {
    element:
    <ProtectedLoginRoute>
      <Login/>
    </ProtectedLoginRoute>,
    path:'/login'
  },
  {
    element:<About/>,
    path:'/about'
  },
  {
    element:<ContactUs/>,
    path:'/contact'
  },
  {
    element:<ForgetPassword/>,
    path:'/reset-password'
  }
])

function App() {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("myEventsIq_userName") || "guest";
  });

  return (
    <>
      <Toaster/>
      <UserContext.Provider value={{userName, setUserName}}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App