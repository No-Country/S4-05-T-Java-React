import { React } from "react";

function ReciveMsj(props) {
    
    return(
        <div className="reciveMsj" style={props.first ? {marginTop: "1rem"} : {marginTop: "0.2rem"}}>
            <div className="reciveMsj__arrow"
                style={props.first ? {backgroundImage: "linear-gradient(to top right, #99999900 50%, white 50%)"} : {backgroundColor: "#99999900"}}>
            </div>                    

            <div className="reciveMsj__main">
                <h5>{props.first ? props.sender : null}</h5>
                <p className="reciveMsj__msj">{props.msj}</p>
                <p className="reciveMsj__time">{props.time}</p>
            </div>               
        </div>
    )
}

export default ReciveMsj