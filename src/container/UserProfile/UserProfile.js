import axios from '../../axios';
import {useEffect, useState} from 'react';
import ArticlePreview from '../../component/ArticlePreview/ArticlePreview';
import Button from '../../component/Button/Button'
import classes from './UserProfile.module.css'
import {  useNavigate } from 'react-router-dom';

function UserProfile(props){
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userArticles, setUserArticles] = useState([]);

    useEffect(( )=>{
        axios
            .get(`/users/${props.userId}`)
            .then((result)=>{
                setUser({...result.data})
            })
            .catch( (err)=>{
                console.log(err);
            });

        axios
            .get(`/users/${props.userId}/articles`)
            .then((articles)=>{
                const temp = [];
                articles.data.forEach((article)=>{
                    temp.push(
                      <ArticlePreview
                        key={article.id}
                        title={article.title}
                        content={article.content}
                        id={article.id}
                      />
                    );
                })
                setUserArticles(temp);
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
    }, [props.userId]);

    function editProfile(){
        navigate("/profile/edit");
    }

    function deleteProfile(){
        axios.delete(`/users/${props.userId}`, {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then( (result)=>{
            navigate("/logout");
        })
        .catch( (err)=>{
            console.log(err);
        } )
    }

    return (
      <div>
        <div className={classes["heading"]} >
          <h2 className={classes["username"]}> Hi {user.name}! </h2>
          <Button onClickHandler={ ()=> {deleteProfile()} }> Delete Profile </Button>
          <Button onClickHandler={ ()=> {editProfile()} }> Edit Profile </Button>
        </div>
        {userArticles}
      </div>
    );
}


export default UserProfile;

