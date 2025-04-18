import './account.css'
import {useAuth} from "../../hooks/auth";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import LoadingData from "../info/loading-data/loading-data";
import Button from "../button/button";

export default function Account() {
    const {isAuthenticated, logout, user} = useAuth();
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const didFetch = useRef(false);

    const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    if (!isAuthenticated)
        return (
            <Navigate
                to="/login"
                state={{from: location}}
                replace
            />
        );

    const fetchData = () => {
        if (!user) return;
        let mounted = true;
        axios.get(`http://${backHost}:${backPort}/api/auth/user/${user.sub}`)
            .then(res => {
                if (mounted)
                    setUserData(res.data);
            })
            .catch(err => {
                if (axios.isAxiosError(err))
                    navigate('/500')
                else navigate('/404');
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!didFetch.current && user) {
            didFetch.current = true;
            fetchData();
        }
    }, [logout, user]);

    if (loading)
        return <LoadingData/>;

    if (!userData)
        return <Navigate to="/500" />;

    return (
        <div className="main">
            <div className="avatar">
                <img className="avatar-link"
                     src={userData.avatars.length !== 0 ? `data:${userData.avatars[0].contentType};base64,${userData.avatars[0].binaryData}`
                         : "default-avatar.png"}
                     alt="avatar image"/>
            </div>
            <div className="account-main-info">
                <p><span><strong>Юзернейм:</strong> {userData.username}</span></p>
                <p><span><strong>Имя:</strong> {userData.name}</span></p>
                <p><span><strong>Фамилия:</strong> {userData.lastName}</span></p>
                <p><span><strong>Почта:</strong> {userData.email}</span></p>
                <p><span><strong>Дата регистрации:</strong> {userData.dateRegistration}</span></p>
                <p><span><strong>Активность:</strong> {userData.activity.toString()}</span></p>
                <p><span><strong>Роли:</strong> {userData.roles.map(role =>
                    <span key={role.id}>{role.role}</span>
                )}</span></p>
                <p>
                    <a className="toProject" href={`/projects/user/allProjects/${userData.email}`}>К проектам</a>
                </p>
                <Button onClickFunction={logout}>Выйти</Button>
            </div>

            {/*<div className="tasks">
                <p>{task.allTasks}</p>
                <p>{task.activeTasks}</p>
                <p>{task.completedTasks}</p>
                <p>{task.canceledTasks}</p>
                <p>{task.expiredTasks}</p>
            </div>*/}

            <div className="svg-image">
                <svg width="560" height="350" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 300 Q140 150, 260 200 T400 120 T540 240"
                          stroke="limegreen" strokeWidth="6" fill="none"
                          strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="20" cy="300" r="5" fill="limegreen"/>
                    <circle cx="260" cy="200" r="5" fill="limegreen"/>
                    <circle cx="400" cy="120" r="5" fill="limegreen"/>
                    <circle cx="540" cy="240" r="5" fill="limegreen"/>
                </svg>
            </div>
        </div>
    )
}