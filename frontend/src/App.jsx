
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/> 
    <Routes>
 
    <Route path="/" element={<Home/>}/>
    </Routes>


    
    </BrowserRouter>
      
    </>
  )
}

export default App
