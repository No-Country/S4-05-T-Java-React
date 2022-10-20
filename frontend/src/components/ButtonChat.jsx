import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ButtonChat = () => {

  const navigate = useNavigate()

  return (
    <button className='button-chat' onClick={() => navigate('/selectContacts')}>
        <img src="/msg.png" alt="msg" />
    </button>
  )
}
