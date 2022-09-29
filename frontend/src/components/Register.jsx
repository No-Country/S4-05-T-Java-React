import React from 'react'
import Button from './Button'
import '../styles/components/_register.scss';

function Register() {
  return (
    <div className='main-register'>

        <form className='form-register'>

        <div className="form">
            <input type="text" name="name" required />
            <label from="name" className="label-name">
                <span className="content-name">Nombre de usuario</span>
            </label>
        </div>

        <div className="form">
            <input type="email" name="email" required />
            <label from="email" className="label-name">
                <span className="content-name">Email</span>
            </label>
        </div>

        <div className="form">
            <input type="password" name="password" autocomplete='off' required />
            <label from="password" className="label-name">
                <span className="content-name">Contraseña</span>
            </label>
        </div>

        <div className="form">
            <input type="password" name="password-repeat" autocomplete='off' required />
            <label from="password-repeat" className="label-name">
                <span className="content-name">Repite la contraseña</span>
            </label>
        </div>

            <Button
            continue = "Registrarse"
            /> 
        </form>

        <div className='links-register'>
          <p className='terms'>Al registrarte, aceptas nuestros <a href="">términos y condiciones</a>.</p>
          <p className='already-account'>¿Ya tienes una cuenta?<a href=""> Inicia sesión</a></p>
        </div>

    
    </div>
  )
}

export default Register