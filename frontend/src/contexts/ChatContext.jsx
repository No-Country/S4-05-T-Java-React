import React, { useState, createContext } from "react";
export const ChatContext = createContext()

function ChatProvider({children}) {

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
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext