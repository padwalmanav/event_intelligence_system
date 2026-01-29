import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Events from '../pages/Events'
import Onboarding from '../pages/Onboarding'
import { Toaster } from 'react-hot-toast'
import EventDetails from '../pages/EventDetails'
import "../styles.css"
import Signup from '../pages/Signup'
import About from '../pages/About'
import Login from '../pages/Login'
import ProtectedEventRoute from '../components/ProtectedEventRoute'
import ContactUs from '../pages/ContactUs'
import ForgetPassword from '../pages/forgetPassword'

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
        element:(
          <ProtectedEventRoute>
            <EventDetails/>
          </ProtectedEventRoute>
        )
      }
    ]
  },
  {
    element:<Signup/>,
    path:'/signup'
  },
  {
    element:<Login/>,
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
  return (
    <>
      <Toaster/>
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  )
}

export default App