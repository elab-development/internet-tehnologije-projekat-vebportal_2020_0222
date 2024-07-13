import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/navBar/NavBar'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/Login'
import Register from './components/register/Register'
import AddArticle from './components/article/AddArticle'
import ArticleDetails from './components/article/ArticleDetails'

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
          <Route path='/addArticle' element={<AddArticle></AddArticle>}></Route>
          <Route path='/articleDetails' element={<ArticleDetails></ArticleDetails>}></Route>
          
        </Routes>

        
      </div>

      </Router>
    </>
  )
}

export default App
