import React, { useState } from 'react'
import { ButtonChat } from './ButtonChat'
import { ChatContact } from './ChatContact'
import {Header} from './Header'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useEffect } from 'react'

export const Home = () => {

    const {getChats, chats, getUserData} = useContext(GlobalContext)

    const [users, setUsers] = useState([])

    const imagen = require.context('./../img', true);

    useEffect(() => {
        (async () => {
            const id = localStorage.getItem('id')
            console.log(id)
            const data = await getChats(id)
            console.log(data);
            if(data){

                const chatUsers = []

                for (const user of data) {
                    for (const chat of user.users) {
                        /*console.log('chat', chat);
                        console.log('id', id);*/
                        if(chat.userId !== Number(id)){
                            console.log(chat);
                            const userData = await getUserData(chat.userId)
                            userData.chatId = user.id
                            console.log(userData);

                            chatUsers.push(userData)
                        }
                    }
                }

                setUsers(chatUsers)
            }
        })();
    }, [])
    // const data = [
    //     {
    //         id: 1,
    //         timestamp: "10:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Oswaldo"
    //     },
    //     {
    //         id: 2,
    //         timestamp: "9:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Jose Martinez"
    //     },
    //     {
    //         id: 3,
    //         timestamp: "8:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Victor Hugo"
    //     },
    //     {
    //         id: 4,
    //         timestamp: "7:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Jualian"
    //     },
    //     {
    //         id: 5,
    //         timestamp: "6:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Marta"
    //     },
    //     {
    //         id: 6,
    //         timestamp: "5:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Maria"
    //     },
    //     {
    //         id: 7,
    //         timestamp: "10:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Oswaldo"
    //     },
    //     {
    //         id: 8,
    //         timestamp: "9:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Jose Martinez"
    //     },
    //     {
    //         id: 9,
    //         timestamp: "8:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Victor Hugo"
    //     },
    //     {
    //         id: 10,
    //         timestamp: "7:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Jualian"
    //     },
    //     {
    //         id: 11,
    //         timestamp: "6:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Marta"
    //     },
    //     {
    //         id: 12,
    //         timestamp: "5:05pm",
    //         msj: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut excepturi nihil modi. Blanditiis tempore eveniet ea soluta consectetur molestiae obcaecati similique id exercitationem modi non, accusamus natus eos assumenda?",
    //         icon: "https://1.bp.blogspot.com/-JREhSKN8sMM/VmH2B-jmFXI/AAAAAAAAIzg/ScNtA185M88/s1600/02273%2Bpaisajes01.jpg",
    //         user: "Maria"
    //     },
    // ]

    return (
        <>
            <Header/>
            <div className='home'>
                {users.length === 0
                ?
                <div className="selectContacts__loading">
                <img src={imagen("./loading.gif")} alt=""/>
            </div>
                :
                    users.map( item => (
                        <ChatContact item={item} key={item.id}/>
                    ))
                }
                <ButtonChat/>
            </div>
        </>
        
    )
}
