import { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext';

function Modal({ closeModal, userClicked }) {

    const { deleteContact } = useContext(GlobalContext);

    const deleteHandle = () => {
        console.log(userClicked + 'antes')
        deleteContact(userClicked);
        console.log(userClicked + 'despues')
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
                <button>Ver más</button>
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