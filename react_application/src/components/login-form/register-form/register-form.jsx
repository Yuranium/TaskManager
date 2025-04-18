import './register-form.css'
import '../login-form.css'
import {Link} from "react-router-dom";
import Button from "../../button/button";
import {useRef, useState} from "react";
import {FaTrashCan} from "react-icons/fa6";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (files)
            setFormData((prev) => ({...prev, avatars: files[0]}));
        else setFormData((prev) => ({...prev, [name]: value}));
    };

    const validate = () => {
        const errs = {};
        ['username', 'password', 'confirmPassword', 'email'].forEach((field) => {
            if (!formData[field]?.trim())
                errs[field] = 'Нужно заполнить';
        });

        if (formData.password && formData.password.length < 6)
            errs.password = 'Минимум 6 символов';

        if (formData.password && formData.confirmPassword
            && formData.password !== formData.confirmPassword)
            errs.confirmPassword = 'Пароли не совпадают';

        if (formData.email) {
            const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRe.test(formData.email))
                errs.email = 'Некорректный e‑mail';
        }

        if (formData.avatars && formData.avatars.size > 5 * 1024 * 1024)
            errs.avatars = 'Максимальный размер 5MB';
        return errs;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
        const backPort = process.env.REACT_APP_BACKEND_PORT;

        setLoading(true);
        try {
            const payload = new FormData();
            payload.append('username', formData.username);
            payload.append('name', formData.name);
            payload.append('lastName', formData.lastName);
            payload.append('password', formData.password);
            payload.append('email', formData.email);
            payload.append('avatars', formData.avatars);

            // const response = await axios.post(`http://${backHost}:${backPort}/api/auth/registration`, payload,
            // { headers: {'Content-Type':'multipart/form-data'} });
        } catch (err) {
            console.error(err);
            setErrors({submit: 'Ошибка при регистрации'});
        } finally {
            setLoading(false);
        }
    };

    const dropFile = () => {
        if (fileRef.current) fileRef.current.value = ""
    };

    return (
        <div className="register-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Регистрация</h2>

                <div className="form-group">
                    <label htmlFor="username">Юзернейм:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors.username && <div className="field-error">{errors.username}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <div className="field-error">{errors.lastName}</div>}
                </div>

                <div className="password-inputs">
                    <div className="password-inputs-1">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            onClickFunction={() => setShowPassword(prev=> !prev)}>
                            {showPassword ? <FaEyeSlash/> : <FaRegEye/>}
                        </Button>
                        {errors.password && <div className="field-error">{errors.password}</div>}
                    </div>
                    <div className="password-inputs-1">
                        <label htmlFor="confirm-password">Повтор пароля:</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <Button
                            onClickFunction={() => setShowConfirmPassword(prev => !prev)}>
                            {showConfirmPassword ? <FaEyeSlash/> : <FaRegEye/>}
                        </Button>
                        {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Электронная почта:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="avatar-form-group">
                    <div className="avatar-wrapper">
                        <label htmlFor="avatars">Аватар:</label>
                        <input
                            type="file"
                            id="avatars"
                            name="avatars"
                            onChange={handleChange}
                            ref={fileRef}
                        />
                        {errors.avatars && <div className="field-error">{errors.avatars}</div>}
                    </div>
                    <div className="avatar-drop-button">
                        <Button onClickFunction={dropFile}>
                            <FaTrashCan /> Сбросить
                        </Button>
                    </div>
                </div>

                <div className="register-container">
                    Есть аккаунт?
                    <Link to="/login"> Войти</Link>
                </div>

                {errors.submit && <div className="form-error">{errors.submit}</div>}

                <Button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </Button>
            </form>
        </div>
    )
}