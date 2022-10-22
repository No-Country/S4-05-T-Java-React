import { HeaderBack } from "./HeaderBack";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ClassNames from 'classnames'

const Perfil = () => {

    const { user, setUser, getUserDataLogin } = useContext(GlobalContext)

    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('id')
          
            await getUserDataLogin(id)
            
        })();
    }, [user])

return (
    <>
        <HeaderBack title={ user.username } />

        {user  && <div className="perfilBody">
            <div className="perfilUserImgCont">
                <img className="perfilUserImg" src={user.picture} alt="Foto perfil" />
            </div>
            <form className="perfilForm">
                <input className={ClassNames('perfilFormInput', 'pointerEvents')} type="text" name="name"  placeholder={user.name} readOnly/>
                <input className={ClassNames('perfilFormInput', 'pointerEvents')} type="text" name="description" placeholder={user.email} readOnly/>
                <input className={ClassNames('perfilFormInput', 'pointerEvents')} type="number" name="phone" placeholder={user.id} readOnly/>
            </form>
        </div>}
    </>
);
}

export default Perfil; 