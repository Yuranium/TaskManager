import './web-chat.css';
import Button from "../button/button";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export default function WebChat() {
    const {user} = useAuth();
    const dataFetched = useRef(false);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState('');
    const stompRef = useRef(null);
    const listRef = useRef(null);
    const navigate = useNavigate();
    const chatId = '00000000-0000-0000-0000-000000000001';
    const webSocketUri = process.env.REACT_APP_WEBSOCKET_URL;

    useEffect(() => {
        const socket = new SockJS(webSocketUri);
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompRef.current = stompClient;

            stompClient.subscribe('/topic/messages', frame => {
                const msg = JSON.parse(frame.body);
                setMessages(prev => {
                    if (prev.some(m => m.id === msg.id)) return prev;
                    return [...prev, msg];
                });
            });
            stompClient.subscribe('/topic/history', frame => {
                const hist = JSON.parse(frame.body);
                setMessages(hist);
            });

            if (!dataFetched.current) {
                dataFetched.current = true;
                stompClient.subscribe('/topic/history', frame => {
                    const hist = JSON.parse(frame.body);
                    setMessages(hist);
                });
                stompClient.send(
                    '/app/chat.history',
                    {},
                    JSON.stringify({ chatId })
                );
            }
        }, error => {
            console.error('STOMP connect error', error);
        });

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
                console.log('STOMP disconnected');
            }
        };
    }, []);

    useLayoutEffect(() => {
        const el = listRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages]);

    const send = () => {
        if (!draft.trim()) return;
        const client = stompRef.current;
        if (!client || !client.connected) {
            console.warn('STOMP not connected yet');
            return;
        }

        const message = {
            chatId,
            ownerId: user.id,
            content: draft.trim(),
            dateCreated: new Date().toISOString(),
        };

        client.send(
            '/app/chat.send',
            {},
            JSON.stringify(message)
        );

        setDraft('');
    };

    return (
        <div className="web-chat-container-open">
            <h3 className="web-chat-header">Task-Manager</h3>
            <div className="messages-wrapper" ref={listRef}>
                <p></p>
                <ul className="chat-messages">
                    {messages.map(m => (
                        <li key={m.id}
                            className={m.ownerId === user.id ? 'my-chat-message' : 'chat-message'}>
                            {m.ownerId !== user.id && (
                                <img src="/default-avatar.png"
                                     className="chat-user-avatar"
                                     alt="avatar"
                                     role="button"
                                     onClick={() => navigate(`/account/${m.ownerId}`)}/>
                            )}
                            <div className={m.ownerId === user.id
                                ? 'my-chat-message-content'
                                : 'chat-message-content'}>
                                <span>{m.content}</span>
                                <span className="timestamp-sended">
                                  {new Date(m.dateCreated).toLocaleTimeString([], {
                                      hour: '2-digit', minute: '2-digit',
                                  })}
                                </span>
                            </div>
                            {m.ownerId === user.id && (
                                <img
                                    src="/default-avatar.png"
                                    className="chat-user-avatar"
                                    alt="avatar"
                                    role="button"
                                    onClick={() => navigate(`/account/${m.ownerId}`)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Сообщение..."
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                />
                <Button onClickFunction={send}>Отправить</Button>
            </div>
        </div>
    );
}