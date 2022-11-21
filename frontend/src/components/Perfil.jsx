import { HeaderBack } from "./HeaderBack";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Perfil = () => {

    const { user, setUser, getUserDataLogin } = useContext(GlobalContext)
    const [userImg, setUserImg] = useState(null)

    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('id')
          
            await getUserDataLogin()
            
        })();
    }, [user])

    const uploadImg = (e) => {
        // let img;
        // var fReader = new FileReader(); 
        // fReader.readAsDataURL(e.target.files[0]); 
        // fReader.onloadend = function(event){ 
        //     img = event.target; 
        // }

        console.log(e);
    }

    const handleOnChangeInputPerfil = (e) => {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
    }


return (
    <>
        <HeaderBack title={'Perfil'} />

        {user  && <div className="perfilBody">
            <div className="perfilUserImgCont">
                <img className="perfilUserImg" src={user.picture} alt="Foto perfil" />
                <label className="perfilBtnImg">
                    <input type="file" name="img" onChange={uploadImg} />
                    <img src='/Camera.png' />
                </label>
            </div>
            <form className="perfilForm">
                <input className="perfilFormInput" type="text" name="name" onChange={handleOnChangeInputPerfil} placeholder={user.name} />
                <input className="perfilFormInput" type="text" name="description" onChange={handleOnChangeInputPerfil} placeholder={user.email} />
                <input className="perfilFormInput" type="number" name="phone" onChange={handleOnChangeInputPerfil} placeholder={user.id} />
                <button className="perfilBtnSave">Guardar</button>
            </form>
        </div>}
    </>
);
}

export default Perfil; 