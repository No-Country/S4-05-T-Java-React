import React from 'react'

function Button(props) {
  return (
    <div>
        <button type = "submit" className='button-submit'>{props.continue}</button>
    </div>
  )
}

export default Button