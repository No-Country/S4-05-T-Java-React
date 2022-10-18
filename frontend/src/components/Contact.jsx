import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const imagen = require.context('./../img', true);

function Contact(props) {

    const {select} = useContext(GlobalContext)
    
    return(
        <div className="contact" id={`${props.name}-${props.id}-Contact`} onClick={() => select(`${props.name}-${props.id}`)}>
            <div className="contact__img">
                <img src={props.img}/>
                <p className="contact__check" id={`${props.name}-${props.id}-Check`}></p>
            </div>                

            <div className="contact__description">
                <h4>{props.name}</h4>
                {/* <p>{props.desc.slice(0,30)}</p> */}
            </div>
        </div>
    )
}

export default Contact