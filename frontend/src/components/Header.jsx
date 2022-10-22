import React, { useState } from 'react'
import { Link } from "react-router-dom";

export const Header = ({ data }) => {

  const [optionsShow, setOptionsShow] = useState(false)
  const [searchShow, setSearchShow] = useState(false)


  const showSearch = () => {
    setOptionsShow(false)
    setSearchShow(!searchShow)
  }

  const showOptions = () => {
    setOptionsShow(!optionsShow)
    setSearchShow(false)
  }

  return (
    <nav className='header'>
      {!data && <h3>Palomo</h3>}
      {data && <div className="header__data">
        <img src={data.icon} alt="icon" />
        <h3>{data.user}</h3>
      </div>}
      <div className="header__icons">
        {!data && <Link to="/addContact"><img src='/add_nav.png' alt="Icono de añadir"/></Link>}
        <img src='/options_nav.png' onClick={showOptions} alt="Icono de opciones"/>
      </div>
      <div className="header__options" style={ optionsShow ?{ 'display': 'block', 'opacity': 1 } :  { 'display': 'none', 'opacity': 0 }}>
        <ul>
          <Link to="/contacts"><li>Ver Contactos</li></Link>
          <Link to="/config"><li>Configuración</li></Link>
          <Link to="/"><li>Cerrar sesión</li></Link>
        </ul>
      </div>
      <div className="header__search" style={ searchShow ?{ 'display': 'block', 'opacity': 1 } :  { 'display': 'none', 'opacity': 0 }}>
        <input  className="header__search__input" placeholder='Buscar...'/>
      </div>
    </nav>
  )
}
