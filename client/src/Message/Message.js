import React, { useContext, useEffect, useState } from 'react';
import './Message.css';
import Conversation from './Conversation';
import Chat from './Chat';
import { IoMdSend } from "react-icons/io";
import Online from './Online';
import { UserContext } from '../Context/Context';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Message() {
    const { id } = useParams();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await fetch(`http://localhost:4000/conversation/${id}`);
                const data = await response.json();
                setConversations(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
        fetchConversations();
    }, [id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentChat) {
                    const response = await fetch(`http://localhost:4000/chat/${currentChat._id}`);
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentChat) {
            console.error("No chat selected");
            return;
        }

        const msg = {
            conversationId: currentChat._id,
            sender: userInfo.id,
            text: newMessage
        };

        try {
            const response = await axios.post("http://localhost:4000/chat/", msg);
            setMessages([...messages, response.data]);
            setNewMessage(""); // Clear the input field after sending message
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className='message'>
            <div className='chatMenu'>
                <div className='chatMenuWrapper'>
                    <input className='inpsearch' type='text' placeholder='Search' />
                    {conversations.map((conversation, index) => (
                        <div key={index} onClick={() => setCurrentChat(conversation)}>
                            {/* Pass the members property of the conversation object */}
                            <Conversation conv={conversation.members[3]} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='chatBox'>
                <div className='chatBoxWrapper'>
                    <div className='chattop'>
                        {messages.map((msg, index) => (
                            <Chat key={index} msg={msg} owner={msg.sender === userInfo.id} />
                        ))}
                    </div>
                    <div className='chatbottom'>
                        <textarea className='chatinp' placeholder='Type Something..' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                        <button className='send' onClick={handleSubmit}><IoMdSend /></button>
                    </div>
                </div>
            </div>
            <div className='chatOnline'>
                <div className='chatOnlineWrapper'>
                    <Online />
                    <Online />
                    <Online />
                    <Online />
                </div>
            </div>
        </div>
    );
}

export default Message;
