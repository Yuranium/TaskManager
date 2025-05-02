import './web-chat.css'
import Button from "../button/button";

export default function WebChat() {
    return (
        /*<div className="web-chat-container">
            <img src="/web-chat/chat-vector-icon.png" className="web-chat-image" alt="chat-icon"/>
        </div>*/
        <div className="web-chat-container-open">
            <h3 className="web-chat-header">Task-Manager</h3>
            <div className="input-group-wrapper">
                <ul className="chat-messages">
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Моё первое сообщение в этом чате</span>
                            <span className="timestamp-sended">12:44</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
                            <span className="timestamp-sended">12:45</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
                            <span className="timestamp-sended">12:45</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
                            <span className="timestamp-sended">12:45</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Моё первое сообщение в этом чате</span>
                            <span className="timestamp-sended">12:45</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</span>
                            <span className="timestamp-sended">12:47</span>
                        </div>
                    </li>
                    <li className="chat-message">
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                        <div className="chat-message-content">
                            <span>Моё первое сообщение в этом чате</span>
                            <span className="timestamp-sended">12:48</span>
                        </div>
                    </li>
                    <li className="my-chat-message">
                        <div className="my-chat-message-content">
                            <span>Моё первое сообщение в этом чате</span>
                            <span className="timestamp-sended">12:49</span>
                        </div>
                        <img src="/default-avatar.png" className="chat-user-avatar" alt="user-avatar"/>
                    </li>
                    </ul>
                <div className="input-group">
                    <input type="text" id="chat-send-message" placeholder="Сообщение..."/>
                    <Button>Отправить</Button>
                </div>
            </div>
        </div>
    )
}