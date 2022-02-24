import React from 'react';
import Button from '../Button/Button';
import classes from "./Navbar.module.css";
import { Link } from 'react-router-dom'

function Navbar(props){
    return (
      <div className={classes["Navbar"]}>
        <Link to="/signup" className={classes["link"]} > <Button  > Sign Up  </Button> </Link>
        <Link to="/login" className={classes["link"]} > <Button > Login  </Button> </Link>
      </div>
    );
}

export default Navbar