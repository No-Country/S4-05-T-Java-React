import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

export const ChatContact = ({ item }) => {

  const navigate = useNavigate()

  const {getChatContacts, contactsChat, getUserData} = useContext(GlobalContext)

  const [contactGeted, setContactGeted] = useState(false)
  const [contact, setContact] = useState({})

  const chat = (id) => {
    getChatContacts(id)
    navigate("/chat/" + id.toString())
  }

  useEffect(() => {
      console.log(contact);
  }, [contact])

  return (
    <div className="Chat-contact" onClick={() => chat(item.chatId)}>
        <div className="Chat-contact__logo">
            <img src={ item.picture } alt='icon'/>
        </div>
        <div className="Chat-contact__data">
            <h4>{ item.name }</h4>
            <h5>{ item.description }</h5>
        </div>
        <div className="Chat-contact__time">
            <h5>{ item.timestamp }</h5>
        </div>
    </div>

  )
}
