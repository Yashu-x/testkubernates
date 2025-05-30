import{Routes,Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Register from "../src/pages/Register";
import Login from "../src/pages/Login";
import DashBord from "../src/pages/DashBord"
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path='/dashbord' element ={<DashBord/>}/>
      </Routes>
    </UserContextProvider>
  )
}

export default App
