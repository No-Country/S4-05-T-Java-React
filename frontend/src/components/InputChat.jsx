import React from "react";

const imagen = require.context("./../img", true);

function InputChat() {

    const adjustArea = (e) => {
        e.target.style.height = "2rem"
        
        if(((e.target.scrollHeight / 16) + 0.2) < 10){
            e.target.style.height = `${(e.target.scrollHeight / 16) + 0.2}rem`;
        } else {
            e.target.style.height = "10rem"
        }
        
    }
    
    return(
        <div className="inputChat">
            <textarea name="msjInput" id="msjInput" rows={1} onKeyUp={adjustArea}/>
            <button type="button"><img src={imagen("./send.png")} alt="" /></button>
        </div>
    )
}

export default InputChat