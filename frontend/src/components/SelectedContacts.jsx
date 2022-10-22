import React, { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import WidgetContact from "./WidgetContact";

function SelectedContacts() {
    
    const {selected} = useContext(GlobalContext)

    useEffect(() => {
        console.log("red: ", selected);
    }, [selected])

    return(
        <div className="selectedContacts">
            {selected.length === 0
            ?
                <h3 className="selectedContacts__h3">Selecciona contactos...</h3>
            :            
                selected.map((contact) => {
                    return(
                        <WidgetContact 
                            key = {contact.id} 
                            id = {contact.id}
                            picture = {contact.picture}
                            name = {contact.name}
                        />
                    )
                })
            }
        </div>
    )
}

export default SelectedContacts