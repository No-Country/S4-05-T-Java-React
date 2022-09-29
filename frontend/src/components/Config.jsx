import { NavLink } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { IoEarthSharp } from "react-icons/io5";
import { useState } from "react";

const Config = () => {
    const [setDarkMode, setSetDarkMode] = useState(false)

    return (
        <>
            <div className="configHeader">
                <h3>Configuración</h3>
            </div>
            <NavLink to={'/perfil:id'} className='configLink'>
                <img className="configUserImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto perfil" />
                <div className="configUser">
                    <h4>Nombre usuario</h4>
                    <p>Descripción / estado</p>
                </div>
            </NavLink>
            <div className="configOptions">
                <div className="configDiv">
                    {setDarkMode
                        ? <MdDarkMode size={40} onClick={() => setSetDarkMode(false)} />
                        : <BsSun size={40} onClick={() => setSetDarkMode(true)} />}
                    <div className="configMode">
                        <h4>Diseño</h4>
                        {setDarkMode
                            ? <p>Dark</p>
                            : <p>Ligth</p>}
                    </div>
                </div>
                <div className="configDiv">
                    <IoEarthSharp size={40} />
                    <div className="configLang">
                        <h4>Idioma</h4>
                        <p>Español</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Config