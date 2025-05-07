import {useEffect, useRef, useState} from "react";
import axios, {HttpStatusCode} from "axios";
import './search-user.css';
import {useNavigate} from "react-router-dom";
import {LuCirclePlus} from "react-icons/lu";

export default function SearchUser() {
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState('');
    const [suggestedData, setSuggestedData] = useState([]);
    const timeoutRef = useRef(null);

    const backHost = process.env.REACT_APP_BACKEND_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    const handleChange = async (e) => {
        const inputData = e.target.value;
        setInputUsername(inputData);

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (inputData.trim() && inputData.length > 2) {
                try {
                    const response = await axios.get(
                        `http://${backHost}:${backPort}/api/chat/user/search`,
                        {params: {usernamePrefix: inputData}}
                    );

                    if (response.status === HttpStatusCode.Ok)
                        setSuggestedData(response.data);
                } catch (error) {
                    console.error('Search error:', error);
                }
            }
        }, 500);
    };
    useEffect(() => {
        return () => {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        };
    }, []);

    const addUserToChat = (userId) => {
        // ...
    }

    return (
        <div className="search-user-container">
            <div className="input-user-search-group">
                <label htmlFor="add-user-to-chat">Кого добавить в чат</label>
                <input type="text"
                       id="add-user-to-chat"
                       name="add-user-to-chat"
                       placeholder="Юзернейм"
                       onChange={handleChange}
                       value={inputUsername}/>
            </div>

            <div className="suggested-options">
                {
                    suggestedData.map(user => (
                        <div key={user.id}
                             className="suggested-user"
                             role="button"
                             onClick={() => navigate(`/account/${user.id}`)}>
                            <img className="suggested-user-avatar"
                                 src="/default-avatar.png"
                                 alt="user-avatar"/>
                            <div className="user-search-username">{user.username}</div>
                            <div className="add-user-to-chat-button"
                                 role="button"
                                 onClick={() => addUserToChat(user.id)}>
                                <LuCirclePlus/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}