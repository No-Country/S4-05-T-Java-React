import React from 'react'

export const ChatContact = ({ item }) => {
  return (
    <div className="Chat-contact">
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
