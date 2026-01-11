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

const router = createBrowserRouter([
  {
    element:<Onboarding />,
    path:'/'
  },
  {
    element:<Events />,
    path:'/events'
  },
  {
    element:
    <ProtectedEventRoute>
      <EventDetails/>
    </ProtectedEventRoute>,
    path:'/events/:id'
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