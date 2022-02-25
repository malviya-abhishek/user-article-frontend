import React from 'react';
import classes from './Button.module.css'


function Button(props){
    return( 
        <button className={ props.green ? classes["btn-green"] : classes.btn} onClick={props.onClickHandler }  > 
            {props.children}
        </button>
    )
}




export default Button