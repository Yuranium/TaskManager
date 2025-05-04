import './web-chat.css'
import Button from "../button/button";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuth} from "../../hooks/auth";

export default function WebChat() {
    const {userAuth} = useAuth();
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState('');
    const wsRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const [user, setUserData] = useState({});

    const webSocketUrl = process.env.REACT_APP_WEBSOCKET_URL;
    const backHost = process.env.REACT_APP_BACKEND_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    useEffect(() => {
        axios.get(`http://${backHost}:${backPort}/api/chat/all-chats`,
            { params: {useId: userAuth.id} })
            .then(res => {
                setUserData(res.data)
            });


        const ws = new WebSocket(webSocketUrl);
        wsRef.current = ws;

        ws.onmessage = e => {
            const msg = JSON.parse(e.data);
            setMessages(msgs => [...msgs, msg]);
        };

        return () => ws.close();
    }, [webSocketUrl]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const send = () => {
        if (!draft.trim() || wsRef.current.readyState !== 1) return;

        const msg = {
            id: crypto.randomUUID(),
            type: 'CHAT',
            dateCreated: new Date().toISOString(),
            ownerId: user.id,
            content: draft.trim(),
            chatId: 'default',
        };

        // 2.1 сразу положить своё сообщение в UI
        setMessages(msgs => [...msgs, msg]);
        // 2.2 отослать на сервер
        wsRef.current.send(JSON.stringify(msg));
        setDraft('');
    };

    return (
        /*<div className="web-chat-container">
            <img src="/web-chat/chat-vector-icon.png" className="web-chat-image" alt="chat-icon"/>
        </div>*/
        <div className="web-chat-container-open">
            <h3 className="web-chat-header">Task-Manager</h3>
            <div className="input-group-wrapper">
                <ul className="chat-messages">
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            className={message.ownerId === user.id ? 'my-chat-message' : 'chat-message'}>
                            {message.ownerId !== user.id && (
                                <img
                                    src={`data:image/jpeg;base64,${user.avatar.binaryData}`}
                                    className="chat-user-avatar"
                                    alt="user-avatar"
                                />
                            )}
                            <div
                                className={
                                    message.ownerId === user.id
                                        ? 'my-chat-message-content'
                                        : 'chat-message-content'}>
                                <span>{message.content}</span>
                                <span className="timestamp-sended">
                                  {new Date(message.dateCreated).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                  })}
                                    </span>
                            </div>
                            {message.ownerId === user.id && (
                                <img
                                    src={`data:image/jpeg;base64,${user.avatar.binaryData}`}
                                    className="chat-user-avatar"
                                    alt="user-avatar"
                                    role="button"
                                    onClick={() => navigate(`/account/${user.id}`)}
                                />
                            )}
                        </li>
                    ))}
                    <div className="input-group">
                        <input type="text"
                               id="chat-send-message"
                               placeholder="Сообщение..."
                               value={draft}
                               onChange={(e) => setDraft(e.target.value)}
                               onKeyDown={(e) => e.key === 'Enter' && send()}/>
                        <Button onClickFunction={send}>Отправить</Button>
                    </div>
                </ul>
            </div>
        </div>
    )
}