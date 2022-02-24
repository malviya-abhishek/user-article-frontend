import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import axios from '../../axios'
import classes from './Article.module.css'

function Article(props){
    const articleId = useLocation().pathname.split("/")[2];
    const [article, setArticle] = useState({});
    
    useEffect( ()=>{
        axios
        .get(`/articles/${articleId}`)
        .then( (result) => {
            const temp = {
              title: result.data.title,
              content: result.data.content,
            //   author: result.data.author,
            //   uploadDate: result.data.createdAt
            };
            setArticle(temp);
        })
        .catch( err => {
            console.log(err);
        });
    }, [] )


    return (
      <div className={classes["Article"]}>
        <div className={classes["title"]}> {article.title} </div>
        <div className={classes["content"]}> {article.content} </div>
      </div>
    );
};


export default Article;
