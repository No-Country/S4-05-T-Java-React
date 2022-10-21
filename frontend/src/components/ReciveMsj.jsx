import { useState } from "react";
import { useEffect } from "react";
import { React, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function ReciveMsj(props) {

    const {contactsChat} = useContext(GlobalContext)

    const [sender, setSender] = useState("")

    for(let i = 0; i < contactsChat.length; i++){
        if(props.sender === contactsChat[i].id){
            setSender(contactsChat[i].username)
        }
    }

    // useEffect(() => {

    // }, [sender])
    
    return(
        <div className="reciveMsj" style={props.first ? {marginTop: "1rem"} : {marginTop: "0.2rem"}}>
            <div className="reciveMsj__arrow"
                style={props.first ? {backgroundImage: "linear-gradient(to top right, #99999900 50%, rgb(218, 213, 213) 50%)"} : {backgroundColor: "#99999900"}}>
            </div>                    

            <div className="reciveMsj__main">
                <h5>{props.first ? sender : null}</h5>
                <p className="reciveMsj__msj">{props.msj}</p>
                <p className="reciveMsj__time">{props.time}</p>
            </div>               
        </div>
    )
}

export default ReciveMsj