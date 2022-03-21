import { useState } from "react";
import Form from '../../component/Form/Form';
import axios from "../../axios";
import {useNavigate} from 'react-router-dom'
import { emailValidate } from "../../services/email.services";

function Login(props){
  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function changeHandler(e) {
      const name = e.target.name;
      const value = e.target.value;
      setDetail({ ...detail, [name] : value });
  }

  function uploadHandler(e) {
      e.preventDefault();

      let errorMsg = "";

      if(detail.email.length === 0 || emailValidate(detail.email) === false  )
        errorMsg += "Wrong email format";
      
      if(errorMsg.length){
        setError(errorMsg);
        return;
      }

      const data = {
          email : detail.email,
          password: detail.password
      }
      axios
      .post("/users/login", data )
      .then( (result)=>{
        props.setLogged(true);
        props.setToken(result.data.token);
        props.setUserId(result.data.userId);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        navigate("/");
      })
      .catch( (err)=>{
        setError(err.response.data.msg);
      });
  }


  const options = {
    formTitle: "Login",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Login",
    formFields: [
      {
        type: "email",
        name: "email",
        value: detail.email,
        placeholder: "Email",
      },
      {
        type: "password",
        name: "password",
        value: detail.password,
        placeholder: "Password",
      },
    ],
  };

        
  return  <Form {...options} />;
        
}


export default Login;
