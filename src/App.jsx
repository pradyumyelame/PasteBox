import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import NavBar from './component/NavBar'
import Paste from './component/Paste'
import ViewPastes from './component/ViewPastes'
import Home from './component/Home'
const router = createBrowserRouter([
  {
      path:'/',
      element:
      <div>
          <NavBar/>
          <Home/>
      </div>
  },
  {
    path:'/pastes',
    element:
    <div>
       <NavBar/>
       <Paste/>
    </div>
  },
  {
    path:'/pastes/:id',
    element:
    <div>
      <NavBar/>
       <ViewPastes/>
    </div>
  }
])
function App() {
  

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
