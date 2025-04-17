import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../../hooks/auth";
import './login-form.css'
import Button from "../button/button";

export default function LoginForm()
{
    const { login } = useAuth();
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
            await login(formData);
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            setError('Неверное имя пользователя или пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход</h2>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователя:</label>
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
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password123"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="form-error">{error}</div>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </Button>
            </form>
        </div>
    )
}