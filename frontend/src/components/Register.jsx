import { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const NAME_REGEX = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;

const REGISTER_URL = '/users';

function Register() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [nameLastName, setNameLastName] = useState('');
    const [validNameLastName, setValidNameLastName] = useState(false);
    const [nameLastNameFocus, setNameLastNameFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
      }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        const resultEmail = EMAIL_REGEX.test(email);
        setValidName(result);
        setValidEmail(resultEmail);
      }, [user, email])

      useEffect(() => {
        const result = NAME_REGEX.test(nameLastName);
        setValidNameLastName(result);
      }, [nameLastName])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatch(match);
      }, [pwd, matchPwd])

      useEffect(() => {
        setErrMsg('');
      }, [user, pwd, matchPwd, email, nameLastName])

      const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = NAME_REGEX.test(nameLastName);

        if(!v1 || !v2 || !v3 || !v4) {
            setErrMsg('Datos inválidos');
            return;
        }

        try {
            const response = 
            await axios.post(REGISTER_URL,
                                JSON.stringify({
                                    email: email,
                                    name: nameLastName,
                                    password: pwd,
                                    picture: "/profileDefaultPicture.png",
                                    repeatPassword: matchPwd,
                                    username: user
                                  }), 
                                { 
                                    headers: { 'Content-type': 'application/json'},
                                    withCredentials: true
                                }
                            );
                            console.log(response.data);
                            console.log(response.accessToken);
                            console.log(JSON.stringify(response));
                            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No hubo respuesta del servidor');
            } else if(err.response?.status === 409) {
                setErrMsg('El nombre de usuario ya existe');
            } else {
                setErrMsg('El registro ha fallado');
            }
            errRef.current.focus();
        }
        /* setSuccess(true); */
      }


  return (
    <>
    {success ? (

        <h1>Se ha registrado con éxito</h1>

    ) : (
    <div className='main-register'>

        <div className='bcc-img'></div>

        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>

        <form className='form-register' onSubmit={handleSubmit}>

        <div className="form">

        <input
            type="text" 
            name="nameLastname" 
            id="nameLastName" 
            ref={userRef} 
            autoComplete="off" 
            onChange={(e) => setNameLastName(e.target.value)} 
            required
            aria-invalid={validNameLastName ? "false" : "true"}
            aria-describedby="uidname"
            onFocus={() => setNameLastNameFocus(true)}
            onBlur={() => setNameLastNameFocus(false)}
        />

            <label htmlFor="username" from="name" className="label-name">
                <span className="content-name">Nombre y Apellido</span>
                <span className={validNameLastName ? "valid" : "hide"}>
                    <img className="svg" src="checkSVG.svg" alt="Nombre de usuario válido"></img>
                </span>
                <span className={validNameLastName || !nameLastName ? "hide" : "invalid"}>
                    <img className="svg" src="errorSVG.svg" alt="Nombre de usuario inválido"></img>
                </span>
            </label>

        </div>

        <p id="uidname" className={nameLastNameFocus && nameLastName && !validNameLastName ? "instructions" : "offscreen"}>
            Todas las palabras deben comenzar con una mayúscula. <br/>
            Solo se admiten letras y espacios. <br/>
            Debes escribir al menos dos nombres. <br/>
        </p>

        <div className="form">

        <input
            type="text" 
            name="name" 
            id="username" 
            autoComplete="off" 
            onChange={(e) => setUser(e.target.value)} 
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
        />

            <label htmlFor="username" from="name" className="label-name">
                <span className="content-name">Nombre de usuario</span>
                <span className={validName ? "valid" : "hide"}>
                    <img className="svg" src="checkSVG.svg" alt="Nombre de usuario válido"></img>
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <img className="svg" src="errorSVG.svg" alt="Nombre de usuario inválido"></img>
                </span>
            </label>

        </div>

        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
            Debe contener de 4 a 24 caracteres. <br/>
            Debe comenzar con una letra. <br/>
            Letras, números, guiones y guiones bajos permitidos.
        </p>

        <div className="form">

        <input
            type="text" /*por alguna razon no funciona la animacion si lo pongo en type = email */ 
            name="email" 
            id="email"
            autoComplete="off" 
            onChange={(e) => setEmail(e.target.value)} 
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
        />

            <label htmlFor="email" from="email" className="label-name">
                <span className="content-name">Email</span>
                <span className={validEmail ? "valid" : "hide"}>
                    <img className="svg" src="checkSVG.svg" alt="Email válido"></img>
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                    <img className="svg" src="errorSVG.svg" alt="Email inválido"></img>
                </span>
            </label>

        </div>

        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
            Introduzca un email de formato válido.
        </p>

        <div className="form">
            <input 
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPwd(e.target.value)}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            required
            />
            <label from="password" htmlFor="password" className="label-name">
                <span className="content-name">Contraseña</span>
                <span className={validPwd ? "valid" : "hide"}>
                    <img className="svg" src="checkSVG.svg" alt="Contraseña válida"></img>
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <img className="svg" src="errorSVG.svg" alt="Contraseña inválida"></img>
                </span>
            </label>
        </div>

        <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
            Debe contener de 8 a 24 caracteres. <br/>
            Debe incluir mayúsculas, minúsculas, un número y un caracter especial. <br/>
            Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span>
            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
            <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>

        <div className="form">
            <input
            type="password"
            id="confirm_pwd"
            name="password-repeat"
            onChange={(e) => setMatchPwd(e.target.value)}
            autocomplete='off'
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            required />

            <label htmlFor="confirm_pwd" from="password-repeat" className="label-name">
                <span className="content-name">Repite la contraseña</span>
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <img className="svg" src="checkSVG.svg" alt="Las contraseñas coinciden"></img>
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <img className="svg" src="errorSVG.svg" alt="Las contraseñas no coinciden"></img>
                </span>
            </label>
        </div>

        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            Las contraseñas deben coincidir.
        </p>

        <div>
            <button disabled={!validName || !validPwd || !validMatch ? true : false} className='button-submit' >Registrarse</button>
        </div>

        </form>

        <div className='links-register'>
          <p className='terms'>Al registrarte, aceptas nuestros <Link to="/">términos y condiciones</Link>.</p>
          <p className='already-account'>¿Ya tienes una cuenta?<Link to="/"> Inicia sesión</Link></p>
        </div>

    
    </div>
    )}
    </>
  )
}

export default Register