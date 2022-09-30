import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const ChatContext = createContext()

function ChatPrivider({children}) {

    const [chatLog, setCahtlog] = useState([])

    const getChatLog = async () => {
        await fetch('url', {

        })
    }
    
    return(
        <ChatContext.Provider value={{
            chatLog,
            getChatLog
        }}>

        </ChatContext.Provider>
    )
}

export default ChatContext