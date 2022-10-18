import React, { useState } from "react";
import { HeaderBack } from "./HeaderBack";
import InputChat from "./InputChat";
import ReciveMsj from "./ReciveMsj";
import SendMsj from "./SendMsj";

function Chat() {

    // const {chatLog, getChatLog} = useContext(ChatContext)

    const [userID, setUserID] = useState("Leonardo")

    const [chatLogLoaded, setChatLogLoaded] = useState(false)
    
    // const [chatLog, setCahtLog] = useState([])
    const [chatLog, setChatLog] = useState([
        
        {
            timestamp: 0,
            sender: "Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 1,
            sender: "Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 2,
            sender: "Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 3,
            sender: "Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 4,
            sender: "Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 5,
            sender: "Leonardo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 6,
            sender: "Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 7,
            sender: "Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
        {
            timestamp: 8,
            sender: "Pablo",
            msj: "asñldfsld asdlñf sdlf sd sdkf sdlñ k slsj lñsdfsd lfsad fasdf ñsldfk sadñlfjas dlñfjasd flñasjdf ñlasdlñs",
            first: true
        },
    ])    

    // useEffect(() => {
        
    
    //     return () => {
    //         second
    //     }
    // }, [third])
    

    let prev = ""
    let auxLog

    // console.log(chatLog);
    // console.log(chatLog.length);

    for(let i = 0; i < chatLog.length; i++){
        auxLog = chatLog.sort(((a, b) => b.timestamp - a.timestamp))
        // console.log(i, prev, auxLog[i].sender);
        if(prev === ""){
            prev = auxLog[i].sender
            continue
        }

        if(prev === auxLog[i].sender){
            // console.log(false);
            auxLog[i-1].first = false
        }
        
        prev = auxLog[i].sender
        
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
                            {m.sender === userID
                            ?
                                <SendMsj
                                    msj = {m.msj}
                                    time = {m.timestamp}
                                    first = {m.first}
                                />                    
                            :
                                <ReciveMsj 
                                    sender = {m.sender}
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