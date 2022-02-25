import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate(); 
  useEffect(() => {
    localStorage.removeItem("token");
    props.setLogged(false);
    navigate("/");
  });

  return <> </>;
}

export default Logout;
