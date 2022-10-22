import React, { useState } from "react";

const imagen = require.context("./../img", true);

function InputChat({sendMessage}) {


    const [value, setValue] = useState({
        message: ""
    })

    const adjustArea = (e) => {

        console.log( e.target.value);
        setValue(e.target.value)

        e.target.style.height = "2rem"
        
        if(((e.target.scrollHeight / 16) + 0.2) < 10){
            e.target.style.height = `${(e.target.scrollHeight / 16) + 0.2}rem`;
        } else {
            e.target.style.height = "10rem"
        }
        
    }

    const sendMessageButton = () => {
       // console.log( e.target);
       console.log(value);
       sendMessage(value)
       setValue({
        message: ""
       })

       
    }
    
    return(
        <div className="inputChat">
            <textarea name="msjInput" id="msjInput" rows={1} onKeyUp={adjustArea} value={value.message}/>
            <button type="button" onClick={sendMessageButton}><img src={imagen("./send.png")} alt="" /></button>
        </div>
    )
}

export default InputChat