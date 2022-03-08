import './App.css';
import Navbar from './component/Navbar/Navbar';
import ArticlePallet from './container/ArticlesPallet/ArticlesPallet';
import Article from './container/Article/Article'
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react';
import Login from './container/Login/Login';
import Signup from './container/Signup/Signup';
import Logout from "./container/Logout/Logout"
import CreateArticle from './container/CreateArticle/CreateArticle';
import UserProfile from './container/UserProfile/UserProfile'
import EditProfile from './container/EditProfile/EditProfile';

function App() {

  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect( ()=>{
    const storedToken = localStorage.getItem("token")
    const storedUserId = localStorage.getItem("userId");
    if(storedToken){
      setToken(storedToken);
      setLogged(true);
      setUserId(storedUserId)
    }
  }, [] )


  return (
    <Router>
      <div className="App">
        <Navbar logged={logged} />
        <Routes>
          <Route path="/" element={<ArticlePallet />} />
          <Route
            exact
            path="/profile"
            element={<UserProfile userId={userId} token={token} />}
          />

          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                setLogged={setLogged}
                setUserId={setUserId}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                setToken={setToken}
                setLogged={setLogged}
                setUserId={setUserId}
              />
            }
          />

          <Route
            path="/profile/edit"
            element={ <EditProfile userId={userId} token={token} />}
          />

          <Route
            path="/logout"
            element={
              <Logout
                setLogged={setLogged}
                setToken={setToken}
                setUserId={setUserId}
              />
            }
          />
          <Route path="/createpost" element={<CreateArticle />} />
          <Route path="/articles/:articleId" element={<Article />} />
          <Route path="/articles/:articleId/edit" element={<CreateArticle />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
