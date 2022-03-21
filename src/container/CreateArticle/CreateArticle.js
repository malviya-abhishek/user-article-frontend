import { useState, useEffect } from "react";
import Form from '../../component/Form/Form';
import axios from "../../axios";
import {useNavigate} from 'react-router-dom'
import { useLocation } from "react-router-dom";

function CreateArticle(props){
  const {state} = useLocation();
  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect( ()=>{
    if(state?.toEdit){
        axios
          .get(`/articles/${state?.articleId}`)
          .then((result) => {
            const temp = {
              title: result.data.title,
              content: result.data.content,
            };
            setDetail(temp);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
    }
    
   }, [state])


  function changeHandler(e) {
      const name = e.target.name;
      const value = e.target.value;
      setDetail({ ...detail, [name] : value });
  }

  function uploadHandler(e) {
      e.preventDefault();
      let errorMsg = "";
      if(detail.title.length === 0)
        errorMsg += "Title is missing | ";
      
      if(detail.content.length === 0)
        errorMsg += "Content is missing ";
      
      if(errorMsg.length){
        setError(errorMsg);
        return;

      }

      const data = {
          title: detail.title,
          content: detail.content
      }
      if(state?.toEdit) {
        const articleId  = state?.articleId;
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
            setError(err.response.data.msg);
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




