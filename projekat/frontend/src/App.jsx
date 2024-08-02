import { useEffect, useState } from 'react'
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
import CommentView from './components/comment/CommentView'
import AddComment from './components/comment/AddComment'
import ButtonComment from './components/button-comment/ButtonComment'
import Articles from './components/article/Articles'
import User from './components/user/User'
import ShowUser from './components/user/ShowUser'
import SearchedArticles from './components/article/SearchedArticles'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(user);
      if(user.isAdmin){
        setIsAdmin(true);
      }
    }

    console.log('isLoggedIn: ' + isLoggedIn + " loggedInUser: " + loggedInUser + " isAdmin: " + isAdmin);
  }, [isLoggedIn,isAdmin]);

  return (
    <>
      <Router>

      <div>

        <NavBar isLoggedIn = {isLoggedIn} isAdmin={isAdmin}></NavBar>
        <Routes>

          <Route path = "/" element = {<HomePage></HomePage>}></Route>
          <Route path = "/login" element = {<Login setIsLoggedIn = {setIsLoggedIn}></Login>}></Route>
          <Route path='/register' element = {<Register></Register>}></Route>
          <Route 
              path='/addArticle' 
              element={isAdmin ? <AddArticle /> : <Navigate to="/" />} 
            />
          <Route path='/articleDetails' element={<ArticleDetails></ArticleDetails>}></Route>
          <Route path='/commentsView' element={<CommentView></CommentView>}></Route>
          <Route path='/addComment' element={<AddComment></AddComment>}></Route>
          <Route path='/articles' element={<Articles/>}></Route>
          <Route path='/user' element = {<User user={loggedInUser} setIsLoggedIn={setIsLoggedIn} setLoggedInUser={setLoggedInUser}></User>}></Route>
          <Route path="/showUser" element = {<ShowUser></ShowUser>}></Route>
          <Route path="/searchArticle" element = {<SearchedArticles></SearchedArticles>}></Route>

        </Routes>

        
      </div>

      </Router>
    </>
  )
}

export default App
