import { useState, useEffect } from "react";
import Form from '../../component/Form/Form';
import axios from "../../axios";
import {useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom";

function CreateArticle(props){
  
  const articleUrl = useLocation().pathname.split("/"); 
  const navigate = useNavigate(); 

  const [detail, setDetail] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [toEdit, setToEdit] = useState(false);

  useEffect( ()=>{
    if(articleUrl[articleUrl.length - 1] == "edit"){
        setToEdit(true);
        axios
          .get(`/articles/${articleUrl[articleUrl.length - 2]}`)
          .then((result) => {
            const temp = {
              title: result.data.title,
              content: result.data.content,
            };
            setDetail(temp);
          })
          .catch((err) => {
            console.log(err);
          });
    }
    
   }, [] )

  function changeHandler(e) {
      const name = e.target.name;
      const value = e.target.value;
      setDetail({ ...detail, [name] : value });
  }

  function uploadHandler(e) {
      e.preventDefault();
      const data = {
          title: detail.title,
          content: detail.content
      }
      if(toEdit) {
          const articleId  = articleUrl[articleUrl.length - 2];
        axios
          .put(`/articles/${articleId}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((result) => {
            navigate(`/articles/${articleId}`);
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      } else {
        axios
          .post("/articles", data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((result) => {
            navigate(`/articles/${result.data.id}`);
          })
          .catch((err) => {
            setError(err.response.data.error);
          });
      }
  }

  const options = {
    formTitle: "Create Form",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Post",
    formFields: [
      {
        type: "text",
        name: "title",
        value: detail.title,
        placeholder: "Title",
      },
      {
        type: "textarea",
        name: "content",
        value: detail.content,
        placeholder: "Article",
      },
    ],
  };

    return <Form { ...options } />
}


export default CreateArticle;




