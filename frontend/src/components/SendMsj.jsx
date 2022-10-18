import React from "react";

function SendMsj(props) {
    
    return(
        <div className="sendMsj" style={props.first ? {marginTop: "1rem"} : {marginTop: "0.2rem"}}>
            <div className="sendMsj__main">
                <p className="sendMsj__msj">{props.msj}</p>
                <p className="sendMsj__time">{props.time}</p>
            </div>

            <div className="sendMsj__arrow"
                style={props.first ? {backgroundImage: "linear-gradient(to top left, #99999900 50%, #D6DCFF 50%)"} : {backgroundColor: "#99999900"}}>
            </div>                    
        </div>
    )
}

export default SendMsj