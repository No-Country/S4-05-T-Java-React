import React, { useContext, useEffect} from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Contact from "./Contact";
import { HeaderBack } from "./HeaderBack";
import SelectedContacts from "./SelectedContacts";

const imagen = require.context('./../img', true);

function SelectContacts(props) {
    
    const {selected, contacts, createChat, getContacts} = useContext(GlobalContext)


    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('id')
            await getContacts(id)
            
        })();
    }, [])

    return(
        <div className="selectContacts">
            <HeaderBack 
                title = {'Elije un contacto'}
                subtitle = {selected.lenght}
            />  

            <SelectedContacts />
            
            <hr/>

            <div className="selectContacts__div">
                {contacts
                ?
                    contacts.map((contact) => {
                        return(
                            <Contact 
                                id = {contact.id}
                                img = {contact.picture}
                                name = {contact.name}
                                desc = {contact.desc}
                            />
                        )
                    })
                :
                    <div className="selectContacts__loading">
                        <img src={imagen("./loading.gif")} alt=""/>
                    </div>
                }
                
            </div>

            

            <div className="selectContacts__enter" onClick={() => createChat(selected)}>
                    <img src="./back.png"/>
            </div>
        </div>
    )
}

export default SelectContacts