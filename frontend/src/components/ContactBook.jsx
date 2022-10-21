import React from 'react'

export const ContactBook = ({ item }) => {
  return (
    <div className="Chat-contact">
        <div className="Chat-contact__logo">
            <img src={ item.picture } alt='icon'/>
        </div>
        <div className="Chat-contact__data">
            <h4>{ item.name }</h4>
            <h5>{ item.description }</h5>
        </div>
    </div>
  )
}