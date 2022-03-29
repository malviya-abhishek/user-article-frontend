import axios from "../../axios";
import { useState } from "react";
import classes from "./SearchBar.module.css"
import { Link } from "react-router-dom";

function SearchBar(props){
    const [word, setWord] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function changeHandler(e) {
        e.preventDefault();
        const value = e.target.value;
        setWord(value);
    }

    function removeList(){
        setTimeout( ()=>{ setSearchResult([]) }, 300 );
    }

    function buttonChange(e){            
        if(e.key === 'Enter' && word.length > 0 ){
            const options = { 
                params: { word : word }
            }
            axios.get("/articles/wordsearch",options).then((result)=>{
                const list = result.data.result;
                const temp = []
                list.forEach(element => {
                    temp.push(
                            <Link className={classes["Link"]}  to={"/articles/" + element.id} key={element.id}>
                                {element.title.substring(0, Math.min(element.title.length, 50))}
                            </Link>
                    )
                });
                setSearchResult(temp)
                
            }).catch((err)=>{
                console.log(err);
            });
        }
        else if(e.key === 'Escape'){
            setSearchResult([]);
        }
    }


    return (
        <>
            <input
                className={classes["input"]}
                type={"text"}
                name={"search"}
                value={word}
                onChange={changeHandler}
                placeholder="Search"
                onKeyUp={buttonChange}
                onBlur={removeList}
            />
            <div className={classes["result-cnt"]} > 
                {searchResult}
            </div>    
        </>
        );
};

export default SearchBar;

