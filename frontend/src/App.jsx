import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Events from '../pages/Events'
import Onboarding from '../pages/Onboarding'
import { Toaster } from 'react-hot-toast'
import EventDetails from '../pages/EventDetails'
import "../styles.css"
import Signup from '../pages/Signup'
import About from '../pages/About'
import Login from '../pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'

const router = createBrowserRouter([
  {
    element:<Onboarding />,
    path:'/'
  },
  {
    element:
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>,
    path:'/events'
  },
  {
    element:
    <ProtectedRoute>
      <EventDetails/>
    </ProtectedRoute>,
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