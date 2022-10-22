import { useContext } from 'react'
import { Link } from "react-router-dom";
import { GlobalContext } from '../contexts/GlobalContext';

function Modal({ closeModal, userClicked }) {

    const { deleteContact } = useContext(GlobalContext);

    const deleteHandle = () => {
        deleteContact(userClicked);
    }

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>

            <div>

                <button onClick={() => closeModal(false)}>
                    <img src='/closeSVG.svg' alt="close"/>
                </button>

            </div>

            <div className='modelBody'>
                <Link to={`/ProfileContact/${userClicked}`}><button>Ver más</button></Link>
                <button onClick={ deleteHandle }>
                    <p>
                        Eliminar Contacto
                    </p>
                </button>
            </div>

        </div>
    </div>
  )
}

export default Modal