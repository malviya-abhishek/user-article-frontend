import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import axios from '../../axios'
import classes from './Article.module.css'
import Button from '../../component/Button/Button';
import { useNavigate } from "react-router-dom";

function Article(props){
    const articleId = useLocation().pathname.split("/")[2];
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect( ()=>{
        axios
        .get(`/articles/${articleId}`)
        .then( (result) => {
            const temp = {
              title: result.data.title,
              content: result.data.content,
              userId: result.data.UserId
            };
            setArticle(temp);
        })
        .catch( err => {
            console.log(err);
        });
    }, [] )

    function deleteArticle(){
      axios
        .delete(`/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          navigate(`/`);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    }


    return (
      <div className={classes["Article"]}>
        <div className={classes["title"]}> {article.title} </div>
        <div className={classes["content"]}> {article.content} </div>

        { 
          userId == article.userId ? 
          <div className={classes["btn-holder"]}>
            <Button  onClickHandler={deleteArticle} > Delete </Button>
            <Button green={true} onClickHandler={()=>{
              navigate(`/articles/${articleId}/edit`);
            }} > Edit </Button>
          </div> 
          : null 
        }
      </div>
    );
};


export default Article;
