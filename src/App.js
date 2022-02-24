import './App.css';
import Navbar from './component/Navbar/Navbar';
import ArticlePallet from './container/ArticlesPallet/ArticlesPallet';
import Article from './container/Article/Article'
import {  BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import {useState, useEffect} from 'react';
import Login from './container/Login/Login';
import Signup from './container/Signup/Signup';

function App() {

  const [logged, setLogged] = useState(false);



  return (
    <Router>
      <div className="App">
        <Navbar> </Navbar>
        <Routes>
          <Route path="/" element={<ArticlePallet />} />
          <Route path="/articles/:articleId" element={<Article/>} />
          <Route path="/login" element={ <Login/> } />
          <Route path="signup" element= { <Signup/> } />
          <Route path="logout" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
