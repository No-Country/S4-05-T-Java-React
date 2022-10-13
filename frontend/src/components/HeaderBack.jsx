import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const HeaderBack = ({title, subtitle}) => {

  const navigate = useNavigate();
  return (
    <nav className='header-back'>
        <img src="/backArrowSVG.svg" alt="back" onClick={() => navigate(-1, {replace: false})}/>
        <div className="header-back__data">
            <h3>{ title }</h3>
            <h4>{ subtitle }</h4>
        </div>
    </nav>
  )
}