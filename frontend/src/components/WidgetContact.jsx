import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const imagen = require.context('./../img', true);

function WidgetContact(props) {    

    const {select} = useContext(GlobalContext)

    return(
        <div className="widgetContact">
            <div className="widgetContact__div" id={`${props.name}-${props.id}-Widget`}>
                <img className="widgetContact__img" src={props.img} />
                <div className="widgetContact__x" onClick={() => select(`${props.name}-${props.id}`)}><p>×</p></div>
                <h4 className="widgetContact__name">{props.name}</h4>
            </div>
        </div>
    )
}

export default WidgetContact