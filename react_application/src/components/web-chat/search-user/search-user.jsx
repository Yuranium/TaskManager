import {useEffect, useRef, useState} from "react";
import axios, {HttpStatusCode} from "axios";
import './search-user.css';
import {useNavigate} from "react-router-dom";
import {LuCirclePlus} from "react-icons/lu";

export default function SearchUser({onAddUser}) {
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState('');
    const [suggestedData, setSuggestedData] = useState([]);
    const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
    const timeoutRef = useRef(null);
    const containerRef = useRef(null);

    const backHost = process.env.REACT_APP_BACKEND_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current &&
                !containerRef.current.contains(event.target)) {
                setIsSuggestionsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleChange = async (e) => {
        const inputData = e.target.value;
        setInputUsername(inputData);
        setIsSuggestionsVisible(inputData.trim().length > 0);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (inputData.trim() && inputData.length > 2) {
                try {
                    const response = await axios.get(
                        `http://${backHost}:${backPort}/api/chat/user/search`,
                        {params: {inputUsername: inputData}}
                    );

                    if (response.status === HttpStatusCode.Ok) {
                        setSuggestedData(response.data);
                        setIsSuggestionsVisible(response.data.length > 0);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                    setIsSuggestionsVisible(false);
                }
            } else {
                setSuggestedData([]);
                setIsSuggestionsVisible(false);
            }
        }, 500);
    };

    const handleInputFocus = () => setIsSuggestionsVisible(suggestedData.length > 0);

    const addUserToChat = userId => {
        onAddUser(userId);
        setIsSuggestionsVisible(false);
    };

    return (
        <div className="search-user-container" ref={containerRef}>
            <div className="input-user-search-group">
                <input
                    type="text"
                    id="add-user-to-chat"
                    name="add-user-to-chat"
                    placeholder="Юзернейм"
                    onChange={handleChange}
                    onFocus={handleInputFocus}
                    value={inputUsername}
                    autoComplete="off"
                />
            </div>

            {isSuggestionsVisible && (
                <div className="suggested-options">
                    {suggestedData.map(user => (
                        <div
                            key={user.id}
                            className="suggested-user"
                            role="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/account/${user.id}`);
                            }}>
                            <img
                                className="suggested-user-avatar"
                                src="/default-avatar.png"
                                alt="user-avatar"
                                title="Профиль пользователя"
                            />
                            <div className="user-search-username">
                                {user.username}
                            </div>
                            <div className="add-user-to-chat-button-wrapper">
                                <div
                                    className="add-user-to-chat-button"
                                    role="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addUserToChat(user.id);
                                    }}>
                                    <LuCirclePlus/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}