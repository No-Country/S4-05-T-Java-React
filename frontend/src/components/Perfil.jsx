import { AiFillCamera } from "react-icons/ai";

const Perfil = () => {
    

    return (
        <>
            <div className="perfilHeader">
                <h3>Perfil</h3>
            </div>
            <div className="perfilBody">
                <div className="perfilUserImgCont">
                <img className="perfilUserImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Foto perfil" />
                <AiFillCamera size={50} className='perfilBtnImg' />
                </div>
                <form className="perfilForm">
                    <input className="perfilFormInput" type="text" id="userName" placeholder="Nombre" />
                    <input className="perfilFormInput" type="text" id="userDescription" placeholder="Descripción / Estado" />
                    <input className="perfilFormInput" type="number" id="userPhone" placeholder="Número de teléfono" />
                    <button className="perfilBtnSave">Guardar</button>
                </form>
            </div>
        </>
    );
}

export default Perfil;