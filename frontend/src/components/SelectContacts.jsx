import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Contact from "./Contact";
import { HeaderBack } from "./HeaderBack";
import SelectedContacts from "./SelectedContacts";

function SelectContacts() {
    
    const {selected, contacts} = useContext(GlobalContext)

    return(
        <div className="selectContacts">
            <HeaderBack 
                title = {'Elije un contacto'}
                subtitle = {selected.lenght}
            />  

            <SelectedContacts />
            
            <hr/>

            <div className="selectContacts__div">
                {contacts.map((contact) => {
                    return(
                        <Contact 
                            id = {contact.id}
                            img = {contact.img}
                            name = {contact.name}
                            desc = {contact.desc}
                        />
                    )
                })}
            </div>

            <div className="selectContacts__enter">
                    <img src="./back.png"/>
            </div>
        </div>
    )
}

export default SelectContacts