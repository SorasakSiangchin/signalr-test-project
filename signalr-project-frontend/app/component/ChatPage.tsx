"use client"
import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const ChatPage = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7231/chatHub/')
            .build();

        newConnection.on('ReceiveMessage', (user, message) => {
            setMessages([...messages, `${user}: ${message}`]);
        });

        newConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.error('Error while starting connection: ', err));

        setConnection(newConnection);
    }, []);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        connection?.send('SendMessage', 'YourName', userInput);
        setUserInput('');
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input1">Chat</label>
                <input id='input1' type="text" value={userInput} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatPage;