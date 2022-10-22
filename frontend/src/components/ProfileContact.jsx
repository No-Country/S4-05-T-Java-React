import { HeaderBack } from "./HeaderBack";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";
import ClassNames from 'classnames'

const Perfil = () => {

    const { id } = useParams()

    const { getUserData } = useContext(GlobalContext)

    const[user, setUser] = useState('');

    useEffect(() => {
        (async () => {
          
            const dataUser = await getUserData(id);
            setUser(dataUser);

        })();
    });

    /* const { user, setUser, getUserDataLogin } = useContext(GlobalContext) */


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