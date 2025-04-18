import './register-form.css'
import '../login-form.css'
import {Link, useLocation, useNavigate} from "react-router-dom";
import Button from "../../button/button";
import {useState} from "react";

export default function RegisterForm()
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/404';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
        } catch (err) {
            console.log(err)
            setError('Неверное имя пользователя или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход</h2>
                <div className="form-group">
                    <label htmlFor="username">Юзернейм (Будет отображаться в системе):</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Имя пользователя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия пользователя:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Повторный пароль:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        placeholder="confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
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
                </div>
                <div className="form-group">
                    <label htmlFor="avatars">Аватар:</label>
                    <input
                        type="file"
                        id="avatars"
                        name="avatars"
                        placeholder="avatars"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="register-container">
                    Есть аккаунт?
                    <Link to="/login"> Войти</Link>
                </div>
                {error && <div className="form-error">{error}</div>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Загрузка...' : 'Зарегистрироваться'}
                </Button>
            </form>
        </div>
    )
}