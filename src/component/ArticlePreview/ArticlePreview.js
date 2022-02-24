import { Link } from 'react-router-dom';
import classes from "./ArticlePreview.module.css";

function ArticlePreview(props){
    return (
      <Link className={classes["Link"]} to={"/articles/" + props.id}>
        <div className={classes["Article"]}>
          <div className={classes["title"]}> {props.title} </div>
          <div className={classes["content"]}> {props.content.substring(0, Math.min(props.content.length, 200))} </div>
        </div>
      </Link>
    );
}

export default ArticlePreview;