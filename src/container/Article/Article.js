import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import axios from '../../axios'
import classes from './Article.module.css'
import Button from '../../component/Button/Button';
import { useNavigate } from "react-router-dom";

function Article(props){
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const userId = localStorage.getItem("userId");

    useEffect( ()=>{
        axios
        .get(`/articles/${useLocation().pathname.split("/")[2]}`)
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
        .delete(`/articles/${useLocation().pathname.split("/")[2]}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          navigate(-1);
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
              navigate(`/articles/${useLocation().pathname.split("/")[2]}/edit`);
            }} > Edit </Button>
          </div> 
          : null 
        }
      </div>
    );
};


export default Article;
