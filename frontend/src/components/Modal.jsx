import React from 'react'

function Modal({ closeModal }) {
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
                <button>
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