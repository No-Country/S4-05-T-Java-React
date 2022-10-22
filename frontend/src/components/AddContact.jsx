import { useRef, useState, useEffect, useContext } from 'react'
import { HeaderBack } from './HeaderBack'
import { GlobalContext } from "../contexts/GlobalContext";

function AddContact() {

    const userRef = useRef();
    const errRef = useRef();

    const { addContact, getUserByName, errMsgUser, setErrMsgUser, getContacts } = useContext(GlobalContext);

    const[userFound, setUserFound] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
    }, [errMsgUser])

    useEffect(() => {
        console.log(userFound + ' usuario encontrado')
    }, [userFound])

    const addContactSubmit = async (e) =>{
        e.preventDefault();

        setUserFound('');
        setSuccess(false);

        let target = e.target.name.value;

        let contact = await getUserByName(target);

        let userLogeado = localStorage.getItem('id')

        console.log(userLogeado + " user logeado")
        console.log(contact.id + " id contacto")

        if(contact.id){
            if(contact.id == userLogeado){
                setErrMsgUser('No te puedes añadir a ti mismo')
                return;
            }

            setUserFound(contact)

            setErrMsgUser('');
        }

      }

      const addContactButton = async() => {

        let userLogeado = localStorage.getItem('id')

        let succesContact = await addContact(userLogeado, userFound.username);

        console.log(succesContact);

        if(succesContact && succesContact.userId){
            console.log('creado con exito')
            setSuccess(true);
        }else{
            setErrMsgUser('Ya existe el contacto');
        }
      }


  return (
    <div className='main-add'>

        <HeaderBack title='Añadir contacto' />

        <form className="form-add-contact" onSubmit={ addContactSubmit }>

        <p ref={errRef} className={errMsgUser ? 'errmsgAdd' : 'offscreen'} aria-live='assertive'>{errMsgUser}</p>

            <div className="form">
                <input type="text" id="username" name="name" ref={userRef} autoComplete="off" required />
                <label htmlFor="username" from="name" className="label-name">
                    <span className="content-name">Buscar por nombre de usuario</span>
                </label>
            </div>

            <div>
                <button className='button-search'>Buscar</button>
            </div>

        </form>


        <div className= {userFound != '' ? 'Chat-contact-add' : 'offscreen'}>
            <div className="Chat-contact__logo">
                <img src={ userFound.picture } alt='icon'/>
            </div>
            <div className="Chat-contact__data">
                <h4>{ userFound.name }</h4>
                <h5>{ userFound.description }</h5>
            </div>
        </div>

        <div className={userFound != '' ? 'div-button-add' : 'offscreen'}>
            <button className={userFound != '' ? 'button-add' : 'offscreen'} id={success === true ? 'success-add' : ''} onClick={ addContactButton }>
                {success === true ? "Agregado" : "Agregar"}{success === true ? <img src = "/checkGreenSVG.svg" className='svg-add'/> : null}
            </button>
        </div>


    </div>
  )
}

export default AddContact