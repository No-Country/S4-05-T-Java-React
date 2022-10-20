import { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from '../contexts/GlobalContext';
/* import AuthContext from '../contexts/AuthProvider'; */

function Login() {
/*   const { setAuth } = useContext(AuthContext); */
  const { loginHandle, errMsg } = useContext(GlobalContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
/*     setErrMsg('');
 */  }, [user, pwd])

 useEffect(() => {
  }, [errMsg])

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    loginHandle(pwd, user);
  }

  return (
    <>
      {success ? (
        null
      ) : (
    <div className='main-login'>
        <h1>Palomo</h1>
        <h2>Bienvenido de vuelta</h2>

        <div className='bcc-img'></div>

        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>

        <form className='form-login' onSubmit={handleSubmit}>

        <div className="form">
            <input type="text" id="username" name="name" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
            <label htmlFor="username" from="name" className="label-name">
                <span className="content-name">Nombre de usuario o email</span>
            </label>
        </div>

        <div className="form">
            <input type="password" id="password" name="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            <label htmlFor="password" from="password" className="label-name">
                <span className="content-name">Contraseña</span>
            </label>
        </div>

        <div>
          <button className='button-submit'>Continuar</button>
        </div>

        </form>

        <div className='links-login'>
          <Link to="/registration">Unirse</Link>
          <Link to="/registration">Olvidé mi contraseña</Link>
        </div>
    
    </div>
    )}
    </>
  )
}

export default Login