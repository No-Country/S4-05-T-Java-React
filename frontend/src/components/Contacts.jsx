import { useContext, useEffect, useState } from 'react'
import { HeaderBack } from './HeaderBack'
import ClassNames from 'classnames'
import { GlobalContext } from '../contexts/GlobalContext';
import Modal from './Modal'
import { ContactBook } from './ContactBook'

function Contacts() {

    const [openModal, SetOpenModal] = useState(false);
    const [userClicked, SetUserClicked] = useState('');
    const { contacts } = useContext(GlobalContext);

    useEffect(() => {
        console.log(userClicked)
    }, [userClicked])

    /* const data = [
        {
            id: 1,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Oswaldo"
        },
        {
            id: 2,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Jose Martinez"
        },
        {
            id: 3,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Victor Hugo"
        },
        {
            id: 4,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Jualian"
        },
        {
            id: 5,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Marta"
        },
        {
            id: 6,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Maria"
        },
        {
            id: 7,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Oswaldo"
        },
        {
            id: 8,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Jose Martinez"
        },
        {
            id: 9,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Victor Hugo"
        },
        {
            id: 10,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Jualian"
        },
        {
            id: 11,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Marta"
        },
        {
            id: 12,
            msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
            icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
            user: "Maria"
        },
     ] */


  return (
    <div className='main'>
        <HeaderBack
            title = "Contactos"
            subtitle = {`${contacts.length} contactos`}
        />

        <div className='main-contacts'>

            { contacts.map( item => (
                <button className={ClassNames('openModalBtn', 'Chat-contact')} onClick={() => {SetOpenModal(true); SetUserClicked(item.id);}}>

                    <ContactBook item={item} key={item.id}/>

                </button>
            ))}

        </div>

        {openModal && <Modal closeModal={SetOpenModal} userClicked={userClicked}/>}

    </div>
  )
}

export default Contacts