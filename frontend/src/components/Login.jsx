import React from 'react'
import Button from './Button'
import '../styles/components/_login.scss';

function Login() {
  return (
    <div className='main-login'>
        <p>Palomo</p>
        <h1>Bienvenido de vuelta</h1>

        <form className='form-login'>

        <div className="form">
            <input type="text" name="name" required />
            <label from="name" className="label-name">
                <span className="content-name">Nombre de usuario o email</span>
            </label>
        </div>

        <div className="form">
            <input type="password" name="password" autocomplete='off' required />
            <label from="password" className="label-name">
                <span className="content-name">Contraseña</span>
            </label>
        </div>

            <Button
            continue = "Continuar"
            /> 
        </form>

        <div className='links-login'>
          <a href="/registration">Unirse</a>
          <a href="">Olvidé mi contraseña</a>
        </div>
    
    </div>
  )
}

export default Login