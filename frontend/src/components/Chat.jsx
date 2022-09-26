import React, { useState } from "react";
import InputChat from "./InputChat";
import ReciveMsj from "./ReciveMsj";
import SendMsj from "./SendMsj";

function Chat() {

    const [userID, setUserID] = useState("Leonardo")

    const [chatLogLoaded, setChatLogLoaded] = useState(false)
    
    const [chatLog, setChatLog] = useState([
        {
            timestamp: 0,
            id: "user-Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 1,
            id: "user-Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 2,
            id: "user-Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 3,
            id: "user-Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 4,
            id: "user-Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 5,
            id: "user-Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 6,
            id: "user-Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 7,
            id: "user-Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 8,
            id: "user-Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
    ])

    let prev = ""
    let auxLog

    console.log(chatLog);
    console.log(chatLog.length);

    for(let i = 0; i < chatLog.length; i++){
        auxLog = chatLog
        console.log(i, prev, auxLog[i].id.split("-")[1]);
        if(prev === auxLog[i].id.split("-")[1]){
            console.log(false);
            auxLog[i].first = false
        }
        
        prev = auxLog[i].id.split("-")[1]
        
    }

    if(!chatLogLoaded){
        setChatLog([
            ...auxLog,                
        ])

        setChatLogLoaded(true)
    }    

    return(
        <div className="chat">
            <div className="chat__msjs">
                {chatLog.map((m) => {
                    return(
                        <div className="chat__div">
                            {m.id === "user-" + userID
                            ?
                                <SendMsj
                                    msj = {m.msj}
                                    time = {m.timestamp}
                                    first = {m.first}
                                />
                    
                            :

                                <ReciveMsj 
                                    id = {m.id}
                                    msj = {m.msj}
                                    time = {m.timestamp}
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