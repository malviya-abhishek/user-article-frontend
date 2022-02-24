import { useState, useEffect } from "react";
import Form from "../../component/Form/Form";
import axios from "../../axios";

function Signup(props) {
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
        console.log(result.data.token);
        
      })
      .catch((err) => {
          console.log(err);
        // setError(err.response.data.error);
      });
  }

  const options = {
    formTitle: "SignUp",
    errorMsg: error,
    changeHandler: changeHandler,
    uploadHandler: uploadHandler,
    btnText: "SignUp",
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

  return <Form {...options} />;
}

export default Signup;
