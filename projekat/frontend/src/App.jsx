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
import Footer from './components/footer/Footer'

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(user);
      if(user.isAdmin){
        setIsAdmin(true);
      }
      if(user.is_banned){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        isLoggedIn(false);
        isAdmin(false);
        isBanned(true);
        window.reload.location();
      }
    }

    console.log('isLoggedIn: ' + isLoggedIn + " loggedInUser: " + loggedInUser + " isAdmin: " + isAdmin);
  }, [isLoggedIn,isAdmin,isBanned]);

  return (
    <>
      <Router>

      <div className="app">

        <NavBar isLoggedIn = {isLoggedIn} isAdmin={isAdmin}></NavBar>
        {!isBanned?
        <div className="content">
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
        </div>:<h1>Korisnik je banovan!</h1>}
        <Footer></Footer>
        
      </div>

      </Router>
    </>
  )
}

export default App
