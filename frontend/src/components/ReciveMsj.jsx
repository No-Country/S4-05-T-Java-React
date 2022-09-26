import { React } from "react";

function ReciveMsj(props) {
    
    return(
        <div className="reciveMsj" style={props.first ? {marginTop: "1rem"} : {marginTop: "0.2rem"}}>
            <div className="reciveMsj__arrow"
                style={props.first ? {backgroundColor: "white"} : {backgroundColor: "#EDEDED"}}></div>                    

            <div className="reciveMsj__main">
                <p className="reciveMsj__msj">{props.msj}</p>
                <p className="reciveMsj__time">{props.time}</p>
            </div>               
        </div>
    )
}

export default ReciveMsj