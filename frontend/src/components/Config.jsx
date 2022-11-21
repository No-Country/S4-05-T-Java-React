import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { HeaderBack } from "./HeaderBack";

const Config = () => {

    const {user, getUserDataLogin } = useContext(GlobalContext)

    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('id')
          
             await getUserDataLogin()
                        
        })();
    }, [user])
    

    const [setDarkMode, setSetDarkMode] = useState(false)

    return (
        <>
            <HeaderBack title={'Configuración'} />

            <div className="config">
                {user && <NavLink to={'/perfil'} className='configLink'>
                    <img className="configUserImg" src={user.picture} alt="Foto perfil" />
                    <div className="configUser">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>
                </NavLink>}
                <div className="configOptions">
                    <div className="configDiv">
                        {setDarkMode
                            ? <img src="/Sunlight.png" onClick={() => setSetDarkMode(false)} />
                            : <img src="/Sunlight.png" onClick={() => setSetDarkMode(true)} />}
                        <div className="configMode">
                            <h4>Diseño</h4>
                            {setDarkMode
                                ? <p>Dark</p>
                                : <p>Ligth</p>}
                        </div>
                    </div>
                    <div className="configDiv">
                        <img src="/Globe.png" />
                        <div className="configMode">
                            <h4>Idioma</h4>
                            <p>Español</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Config