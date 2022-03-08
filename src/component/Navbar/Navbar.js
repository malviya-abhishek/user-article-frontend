import React from 'react';
import Button from '../Button/Button';
import classes from "./Navbar.module.css";
import { Link } from 'react-router-dom'
import SearchBar from '../../container/SearchBar/SearchBar';

function Navbar(props){
    return (
      <div className={classes["Navbar"]}>
        
        <Link to="/" className={classes["text"]} >  Home  </Link>
        
        { 
          props.logged ? 
            <>
              <Link to="/profile" className={classes["text"]} >  Profile  </Link>
              <Link to="/logout" className={classes["link"]} > <Button  > Logout  </Button> </Link> 
              <Link to="/createpost"  className={classes["link"]} > <Button green={true}  > Create Post  </Button> </Link> 
            </> :
            (
              <>
                <Link to="/signup" className={classes["link"]} > <Button  > Sign Up  </Button> </Link>
                <Link to="/login" className={classes["link"]} > <Button > Login  </Button> </Link>
              </>
            )
        }
        
        <div className={classes["search-bar"]} > 
          <  SearchBar />
        </div>
      </div>
    );
}

export default Navbar