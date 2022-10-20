import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { HeaderBack } from "./HeaderBack";
import InputChat from "./InputChat";
import ReciveMsj from "./ReciveMsj";
import SendMsj from "./SendMsj";

function Chat() {

    const {chatContacts} = useContext(GlobalContext)

    const [userID, setUserID] = useState(0)

    const [chatLogLoaded, setChatLogLoaded] = useState(false)
    
    // const [chatLog, setCahtLog] = useState([])
    const [chatLog, setChatLog] = useState([        
        {
            date: 0,
            id: 0,
            message: "asdfasdfasfasdfasd asdf asdf as fasdfasdasfasdfasdf asdfasf",
            userSenderId: 0
        },
        {
            date: 1,
            id: 1,
            message: "stasd fasdfasdf asdfa sdf asdfa sdfasdf ing",
            userSenderId: 0
        },
        {
            date: 2,
            id: 2,
            message: "stasdfsring",
            userSenderId: 1
        },
        {
            date: 3,
            id: 3,
            message: "strg",
            userSenderId: 0
        },
        {
            date: 4,
            id: 4,
            message: "str asdfasd a sdfasdfasdfasdfasdf ing",
            userSenderId: 2
        },
        {
            date: 5,
            id: 5,
            message: "sta sdfas asdring",
            userSenderId: 2
        },
        {
            date: 6,
            id: 6,
            message: "sta sdfasdfasdfasdfasdf asd asd d sd sdaf sdfasdfasd as ring",
            userSenderId: 1
        },
        {
            date: 7,
            id: 7,
            message: "stra sdfasd fasd sd sd ds sd fsd fsd fsdfsdafasdfasdfasdfasdfasdf asd as asdf asf asd asd asding",
            userSenderId: 0
        },
        {
            date: 8,
            id: 8,
            message: "stra sdfasdfasd fasdf asd sd sda ing",
            userSenderId: 1
        },
        {
            date: 9,
            id: 9,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 1
        },
        {
            date: 10,
            id: 10,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 1
        },
        {
            date: 11,
            id: 11,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 1
        },
        {
            date: 12,
            id: 12,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 0
        },
        {
            date: 13,
            id: 13,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 0
        },
        {
            date: 14,
            id: 14,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 0
        },
        {
            date: 15,
            id: 15,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 0
        },
        {
            date: 16,
            id: 16,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 2
        },
        {
            date: 17,
            id: 17,
            message: "stra sd fasd asd fasd sda sd fsda fasd fing",
            userSenderId: 1
        }
    ])    

    let prev = ""
    let auxLog

    for(let i = 0; i < chatLog.length; i++){
        auxLog = chatLog.sort(((a, b) => b.timestamp - a.timestamp))
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

    if(!chatLogLoaded){

        setChatLog([
            ...auxLog,                
        ])

        setChatLogLoaded(true)
    }    

    return(
        <div className="chat">
            <HeaderBack 
                title = {"Pablo" /* Nombre del chat */} 
                subtitle = {"16:30" /* Hora de ultima conexxion/en linea/desc */}
            />
            
            <div className="chat__msjs">
                {chatLog.map((m) => {
                    return(
                        <div className="chat__div">
                            {m.userSenderId === userID
                            ?
                                <SendMsj
                                    msj = {m.message}
                                    time = {m.date}
                                    first = {m.first}
                                />                    
                            :
                                <ReciveMsj 
                                    sender = {m.userSenderId}
                                    msj = {m.message}
                                    time = {m.date}
                                    first = {m.first}
                                />
                            }
                        </div>
                    )
                })}
            </div>
            
            <InputChat />
        </div>
    )
}

export default Chat