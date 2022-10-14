import { useRef, useState, useEffect, useContext, Redirect } from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../contexts/AuthProvider';

import axios from '../api/axios';
const LOGIN_URL = '/auth/login';

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({
                                                                    password: pwd,
                                                                    usernameOrEmail: user
                                                                  }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);

    } catch (err) {

      if (!err?.response) {
        setErrMsg('No hubo respuesta del servidor')
      } else if (err.response?.status === 400) {
        setErrMsg('Por favor rellene todos los campos');
      } else if (err.response?.status === 401) {
        setErrMsg('Sin autorización')
      } else {
        setErrMsg('Ha ocurrido un error');
      }
      errRef.current.focus();
    }

    setSuccess(true);

  }

  return (
    <>
      {success ? (
        <Redirect to="/home"/>
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