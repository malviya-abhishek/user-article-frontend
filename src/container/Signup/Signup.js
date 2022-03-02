import { useState, useEffect } from "react";
import Form from "../../component/Form/Form";
import axios from "../../axios";
import {useNavigate} from 'react-router-dom';

function Signup(props) {
  const navigate = useNavigate(); 
  const [detail, setDetail] = useState({ name: "", email: "", password: ""  });
  const [error, setError] = useState("");

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setDetail({ ...detail, [name]: value });
  }

  function uploadHandler(e) {
    e.preventDefault();
    const data = {
      name: detail.name,
      email: detail.email,
      password: detail.password,
    };
    axios
      .post("/users", data)
      .then((result) => {
        props.setLogged(true);
        props.setToken(result.data.token);
        props.setUserId(result.data.id);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.id);
        navigate("/");
      })
      .catch((err) => {
          console.log(err);
      });
  }

  const options = {
    formTitle: "Sign Up",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "Sign Up",
    formFields: [
      {
        type: "name",
        name: "name",
        value: detail.name,
        placeholder: "Name",
      },
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

export default Signup;
