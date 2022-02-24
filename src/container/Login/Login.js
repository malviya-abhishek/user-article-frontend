import { useState, useEffect } from "react";
import Form from '../../component/Form/Form';
import axios from "../../axios";



function Login(props){
        const [detail, setDetail] = useState({ email: "", password: "" });
        const [error, setError] = useState("");

        function changeHandler(e) {
            const name = e.target.name;
            const value = e.target.value;
            setDetail({ ...detail, [name] : value });
        }

        function uploadHandler(e) {
            e.preventDefault();
            const data = {
                email : detail.email,
                password: detail.password
            }
            axios
            .post("/users/login", data )
            .then( (result)=>{
                console.log(result.data.token);
            })
            .catch( (err)=>{
                setError(err.response.data.error);
            })
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

        return (
            <Form{...options}/>
        );
}


export default Login;