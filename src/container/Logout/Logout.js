import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate(); 
  useEffect(() => {
    props.setLogged(false);
    props.setToken(null);
    props.setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  });

  return <></>;
}

export default Logout;
