import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { HeaderBack } from "./HeaderBack";
import InputChat from "./InputChat";
import ReciveMsj from "./ReciveMsj";
import SendMsj from "./SendMsj";

import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

const imagen = require.context('./../img', true)

function Chat() {
    const url = process.env.REACT_APP_HOST_BACK
    const { getToken, errMsg} = useContext(GlobalContext);
    const { id } = useParams()

    console.log(id);

    const [idUser, setIdUser] = useState()

    const [chatData, setChatData] = useState()

    const [userReceived, setUserReceived] = useState()

    const getMessages = async (id) => {
        const response = await fetch(`${url}/chat/${id}/message?page=0`,                        
            { 
                method: "GET",
                modo: "cors",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Bearer " + getToken()
                }, 
            }
        );
        const data = await response.json()
        console.log(data);
        return data
    }

    const getUser = async (id) => {
        const response = await fetch(`${url}/users/${id}`,                        
            { 
                method: "GET",
                modo: "cors",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Bearer " + getToken()
                }, 
            }
        );
        const data = await response.json()
        console.log(data);
        return data
    }

    const getChat = async (id) => {
        const response = await fetch(`${url}/chat/${id}`,                        
            { 
                method: "GET",
                modo: "cors",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Bearer " + getToken()
                }, 
            }
        );
        const data = await response.json()
        console.log(data);
        return data
    }

    useEffect(() => {
        (async () => {      
            const idUserLocal = localStorage.getItem('id')    
            const data = await getMessages(id)
            console.log("idUserLocal: " + idUserLocal);
            console.log(data);
            let prev = ""
            let auxLog

            for(let i = 0; i < data.length; i++){
                auxLog = data.sort(((a, b) => b.timestamp - a.timestamp))
                auxLog[i].first = true

                // console.log(i, prev, auxLog[i].userSenderId);
                if(prev === ""){
                    prev = auxLog[i].userSenderId
                    continue
                }

                if(prev === auxLog[i].userSenderId){
                    auxLog[i-1].first = false
                } 
                
                prev = auxLog[i].userSenderId
                
            }
            setChatLog(auxLog)
            setIdUser(idUserLocal)

            const chatResponse = await getChat(id)
            setChatData(chatResponse)
            console.log(chatResponse);
            const userReceivedFilter =  chatResponse && chatResponse.users.filter( user => Number(user.userId) !== Number(idUserLocal))
            console.log(userReceivedFilter);

            const userReceivedResponse = await getUser(userReceivedFilter[0].userId)

            setUserReceived(userReceivedResponse)

            console.log("userReceivedResponse: " +userReceivedResponse);
        })();
    }, [])
    

    const [chatLog, setChatLog] = useState([
    ])    

    //sockets
    const connect = () => {
        const socket = new SockJS(url+"/ws");
        console.log("ayuda", socket);
        const stompClient = Stomp.over(socket);
        // comment the line below if you want to see debug messages
        console.log("ayuda", stompClient);
        stompClient.debug = msg => {};
        stompClient.connect(
          {},
          frame => {
              stompClient.subscribe(`/chat-room/${id}`, async (tick) => {
                console.log(tick);
                const data = await getMessages(id)
                console.log(data);
                setChatLog(data)
                const room = JSON.parse(tick.body);
                //commit("main/addRoom", room, { root: true });
              });
          },
          error => {
            console.log(error);
            //commit("setConnected", false);
          }
        );
    }

    const send = async (value) => {
        console.log(value);

        //const id = localStorage.getItem('id')

        const socket = new SockJS(url+"/ws");
        console.log("ayuda", socket);
        const stompClient = Stomp.over(socket);
        // comment the line below if you want to see debug messages
        console.log("ayuda", stompClient);
        stompClient.debug = msg => {};
        stompClient.connect(
          {},
          frame => {
            console.log("frame", frame);
            //commit("setConnected", true);
           
            stompClient.subscribe(`/chat-app/chat-room/${id}`, tick => {
                console.log(tick);
                const room = JSON.parse(tick.body);
                //commit("main/addRoom", room, { root: true });
              });
             
                stompClient.send(
                    `/chat-app/chat/${id}/sendMessage`,
                    JSON.stringify({
                        "message": value ,"userSenderId": idUser, "chatId": id
                    })
                    );
          },
          error => {
            console.log(error);
            //commit("setConnected", false);
          }
        );
      
    }

    useEffect(() => {
        connect()
    }, [])

    return(
        <div className="chat">
            <HeaderBack 
                title = {userReceived && userReceived.name/* Nombre del chat */} 
                subtitle = {userReceived && userReceived.status/* Hora de ultima conexxion/en linea/desc */}
            />
            
            {<div className="chat__msjs">
                {chatLog && chatLog.map((m) => {
                    
                    return(
                        <div className="chat__div">
                            {Number(m.userSenderId) === Number(idUser)
                            ?
                                <SendMsj
                                    msj = {m.message}
                                    time = {m.date}
                                    first = {m.first}
                                    key={m.id}
                                />                    
                            :
                                <ReciveMsj 
                                    sender = {m.userSenderId}
                                    msj = {m.message}
                                    time = {m.date}
                                    first = {m.first}
                                    key={m.id}
                                />
                            }
                        </div>
                    )
                })}
            </div>}
            
            <InputChat sendMessage={send}/>

            <div className="chat__img"></div>
        </div>
    )
}

export default Chat