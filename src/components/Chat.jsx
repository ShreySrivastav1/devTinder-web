import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const user = useSelector(store => store.user)
    const userId = user?._id;

    const fetchMessages = async() => {
        
            const chat = await axios.get(BASE_URL + "/chat/" + targetUserId,{
                withCredentials:true
            });

            console.log(chat.data.messages);

            const chatMessages = chat?.data?.messages.map((msg) => {
                return {
                    text: msg.text,
                    userId: msg.senderId._id,
                    firstName: msg.senderId.firstName
                };
            });

            setMessages(chatMessages);
        
    };

    useEffect(() =>{
        fetchMessages();
    },[])



    useEffect(() => {
        if(!userId) {
            return;
        }
        const socket = createSocketConnection();
        setSocket(socket);

        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId
        });


        socket.on("messageReceived", ({firstName, text, userId}) => {
            setMessages((messages) => [...messages,{firstName, text, userId}]);
        });


        return () => {
            socket.disconnect();
        };

    },[userId , targetUserId]);

   const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const messageData = {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage,
    };

    // show instantly on your screen
    setMessages((messages) => [...messages, messageData]);

    socket.emit("sendMessage", messageData);

    setNewMessage("");
};


     return (
        <div className="flex justify-center my-10">
            <div className="w-full max-w-2xl h-[75vh] bg-base-100 shadow-xl rounded-2xl flex flex-col">

                {/* Header */}
                <div className="p-4 border-b border-base-300">
                    <h1 className="text-xl font-bold">Chat</h1>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-base-200">
                    {messages.map((msg, index) => (
                        <div
                        key={index}
                        className={`chat ${
                            msg.userId === userId ? "chat-end" : "chat-start"
                        }`}
                        >
                            <div
                            className={`chat-bubble ${
                                msg.userId === userId
                                ? "chat-bubble-primary"
                                : ""
                            }`}
                            >
                                {msg.text}
                                </div>
                                </div>
                            ))}
                            </div>

                {/* Input */}
                <div className="p-4 border-t border-base-300 flex gap-2">
                    <input
                    type="text"
                    value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     placeholder="Type a message..."
                     className="input input-bordered flex-1"
                     />
                     <button className="btn btn-primary" onClick={sendMessage}>
                        Send
                        </button>
                        </div>
                    </div>
        </div>
    );

};

export default Chat;