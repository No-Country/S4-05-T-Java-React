import React, { useState } from 'react'
import { ButtonChat } from './ButtonChat'
import { ChatContact } from './ChatContact'
import {Header} from './Header'
import { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useEffect } from 'react'

export const Home = () => {

    const {getChats, getUserData} = useContext(GlobalContext)

    const [users, setUsers] = useState(null)

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


    return (
        <>
            <Header/>
            <div className='home'>
                {!users
                ?
                <div className="selectContacts__loading">
                <img src={imagen("./loading.gif")} alt=""/>
                <div className='home__img'></div>
            </div>
                : users.length === 0 ?
                <h3>No tienes ningun chat para mostrar</h3>
                :
                    users.map( item => (
                        <ChatContact item={item} key={item.id}/>
                    ))
                }
                <div className='home__img'></div>
                <ButtonChat/>
            </div>
        </>
        
    )
}
