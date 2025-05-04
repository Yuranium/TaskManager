import {useState} from "react";
import Button from "../button/button";
import axios from "axios";

export default function CreateChat({ownerId}) {
    const [formData, setFormData] = useState({
        chatTitle: '',
        maxChatTitleLength: ''
    });

    const [errors, setErrors] = useState({
        chatTitle: '',
        maxChatTitleLength: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const errs = {};
        if (!formData.chatTitle.trim())
            errs.chatTitle = 'Нужно заполнить';

        if (formData.chatTitle.length >= 50)
            errs.maxChatTitleLength = 'Название больше, чем 50 символов!'

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const backHost = process.env.REACT_APP_BACKEND_HOST;
        const backPort = process.env.REACT_APP_BACKEND_PORT;

        try {
            await axios.post(`http://${backHost}:${backPort}/api/auth/registration`,
                {params: {title: formData.chatTitle, ownerId}});

        } catch (err) {
            setErrors({submit: 'Ошибка при регистрации'});
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Создать новый чат</h3>
                <label htmlFor="chatTitle" id="chatTitle"/>
                <input type="text"
                       id="chatTitle"
                       name="chatTitle"
                       placeholder="Название чата"
                       onChange={handleChange}
                       value={formData.chatTitle}/>

                {errors.chatTitle && <div className="field-error">{errors.chatTitle}</div>}
                {errors.maxChatTitleLength && <div className="field-error">{errors.maxChatTitleLength}</div>}
                {errors.submit && <div className="form-error">{errors.submit}</div>}

                <Button type="submit" style={{fontWeight: "normal"}}>Создать чат</Button>
            </form>
        </div>
    )
}