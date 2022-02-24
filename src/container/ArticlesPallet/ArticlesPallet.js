import {useState, useEffect} from 'react';

import axios from '../../axios/index';
import ArticlePreview from "../../component/ArticlePreview/ArticlePreview";

function ArticlePallet(props){

    const [list, setList] = useState([]);

    useEffect(()=>{
        axios
            .get("/articles")
            .then((articles)=>{
                const temp = [];
                articles.data.forEach((article) => {
                  temp.push(
                    <ArticlePreview
                      key={article.id}
                      title={article.title}
                      content={article.content}
                      id={article.id}
                    />
                  );
                });
                setList(temp);
            }).catch((err)=>{
              console.log(err);
            })
    },[])

    return (
      <div>
        {list}
      </div>
    );
}


export default ArticlePallet;