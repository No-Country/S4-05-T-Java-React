import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

export const ChatContact = ({ props }) => {

  const navigate = useNavigate()

  const {getChatContacts, contactsChat, getUserData} = useContext(GlobalContext)

  const [contactGeted, setContactGeted] = useState(false)
  const [contact, setContact] = useState({})

  const chat = (id) => {
    getChatContacts(id)
    navigate("/chat:" + id.toString())
  }

  if(!contactGeted){
    setContact(getUserData(props.id))
    setContactGeted(true)
  }
  console.log(props);

  useEffect(() => {
      console.log(contact);
  }, [contact])

  return (
    <div className="Chat-contact" onClick={() => chat(props.id)}>
        <div className="Chat-contact__logo">
            <img src={ contact.picture } alt='icon'/>
        </div>
        <div className="Chat-contact__data">
            <h4>{ contact.username }</h4>
            <h5>{ contact.description }</h5>
        </div>
    </div>

  )
}
