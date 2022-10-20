import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../contexts/GlobalContext'

export const ChatContact = ({ item }) => {

  const navigate = useNavigate()

  const {getChatContacts} = useContext(GlobalContext)

  const chat = (id) => {
    getChatContacts(id)
    navigate("/chat:" + id.toString())
  }

  return (
    <div className="Chat-contact" onClick={() => chat(item.id)}>
        <div className="Chat-contact__logo">
            <img src={ item.icon } alt='icon'/>
        </div>
        <div className="Chat-contact__data">
            <h4>{ item.user }</h4>
            <h5>{ item.msj }</h5>
        </div>
        <div className="Chat-contact__time">
            <h5>{ item.timestamp }</h5>
        </div>
    </div>

  )
}
