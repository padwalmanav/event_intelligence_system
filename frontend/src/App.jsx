import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Events from '../pages/Events'
import Onboarding from '../pages/Onboarding'
import { Toaster } from 'react-hot-toast'
import EventDetails from '../pages/EventDetails'
import "../styles.css"
import Signup from '../pages/Signup'

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
    element:<EventDetails/>,
    path:'/events/:id'
  },
  {
    element:<Signup/>,
    path:'/signup'
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}>
      <Toaster/>
      </RouterProvider>
    </>
  )
}

export default App