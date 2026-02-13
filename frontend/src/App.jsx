
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Navbar />} />
    </Routes>


    
    </BrowserRouter>
      
    </>
  )
}

export default App
