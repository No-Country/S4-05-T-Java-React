import { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthProvider';

import axios from '../api/axios';
const LOGIN_URL = 'auth/login';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let token;

     try {
      const response =  await fetch("https://chat-palomo.herokuapp.com/auth/login", {
        method: "POST",
        modo: "cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            /* 'Authorization': token */
        },
        body:JSON.stringify({
            password: pwd,
            usernameOrEmail: user
            })
    }
        ) .then(resp => {

          resp.json()

          console.log(resp)

          if (!resp.status) {
            setErrMsg('No hubo respuesta del servidor')
          } else if (resp.status == 400) {
            setErrMsg('Por favor rellene todos los campos');
          } else if (resp.status == 401) {
            setErrMsg('Sin autorización')
          } else {
            setErrMsg('Ha ocurrido un error');
          } 

          if(resp.status == 200) {
            navigate("/home");
          }
        })

      /* console.log(token); */

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
  }
    /* setSuccess(true); */

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