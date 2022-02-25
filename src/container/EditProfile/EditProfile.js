import { useState, useEffect } from "react";
import Form from "../../component/Form/Form";
import axios from "../../axios";
import {useNavigate} from 'react-router-dom';

function EditProfile(props){
    const navigate = useNavigate();
    const [detail, setDetail] = useState({ name: "", email: "", password: ""});
    const [error, setError] = useState("");

    useEffect( ()=>{
        axios
          .get(`/users/${props.userId}`, {
          })
          .then((result) => {
            setDetail({ ...result.data, password: "" });
          })
          .catch((err) => {
            console.log(err);
          });
    }, []);
    
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
        };

        if(detail.password.length)
            data["password"] = detail.password.password

        axios
          .put(
            `/users/${props.userId}`,
            data,
            { headers: { authorization: `Bearer ${localStorage.getItem("token")}`} }
          )
          .then((result) => {
            navigate(-1);
          })
          .catch((err) => {
            console.log(err.response);
          });
    }

    const options = {
        formTitle: "Update profile",
        errorMsg: error,
        changeHandler: changeHandler,
        uploadHandler: uploadHandler,
        btnText: "update",
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


export default EditProfile;
