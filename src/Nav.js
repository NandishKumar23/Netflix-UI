import React, { useEffect, useState } from "react"

import "./nav.css"

function Nav(){
    const[show,handleShow]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else
                handleShow(false);
            
        });
        // return ()=>{
        //     window.removeEventListener("scroll")
        // };
    },[]);


    return(
        <div className={`nav ${show && "nav_black"}`}>
     <img  className="nav_logo"
      src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
     alt="netflix_logo"
        ></img>
        <img
        className="nav_avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRel4c26sEwdj81loUzjfgikPTZXdlfHh3MnJAcKP2vkA&s"
        alt="Netflix Logo"
        ></img>
        </div>
    )
}
export default Nav;