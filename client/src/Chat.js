import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if(currentMessage !== "")  {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":"+ new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message", messageData)
            setCurrentMessage(pre=>"");
            setMessageList(pre=>[...pre,messageData])
        }
    }
    useEffect(()=> {
      //  console.log("hi");
        socket.on("receive_message", (data) => {
            //console.log(data);
            setMessageList(pre=>[...pre, data]);
        })
        return ()=>socket.removeListener('receive_message');
    }, [socket])
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom  className="message-container">
                {messageList.map((message) => {
                    return (<div className="message" id={username===message.author?"you":"other"}> 
                        <div>
                            <div className="message-content">
                                <p>{message.message}</p>
                            </div>
                            <div className="message-meta">
                            <p>{message.time}</p>
                            <p>{message.author}</p>

                            </div>
                        </div>
                    </div>)
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input onKeyPress={(e)=>(e.key==="Enter" && sendMessage())} type="text" placeholder="Hey..." onChange={(e)=>setCurrentMessage(e.target.value)}/>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}


export default Chat;