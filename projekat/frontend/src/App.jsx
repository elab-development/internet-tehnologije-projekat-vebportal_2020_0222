import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/navBar/NavBar'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/register/Register'

function App() {
  

  return (
    <>
      <Router>

      <div>

        <NavBar></NavBar>
        <Routes>

          <Route path = "/" element = {<HomePage></HomePage>}></Route>
          <Route path = "/login" element = {<Login></Login>}></Route>
          <Route path='/register' element = {<Register></Register>}></Route>
        </Routes>

        
      </div>

      </Router>
    </>
  )
}

export default App
