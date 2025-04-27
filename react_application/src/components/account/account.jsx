import './account.css'
import {useAuth} from "../../hooks/auth";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import LoadingData from "../info/loading-data/loading-data";
import Button from "../button/button";
import {CiCalendarDate} from "react-icons/ci";
import {MdAlternateEmail, MdOutlineAdminPanelSettings} from "react-icons/md";
import {TbActivity} from "react-icons/tb";
import {TiClipboard} from "react-icons/ti";
import {FaRegCircleUser} from "react-icons/fa6";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

export default function Account() {
    const {isAuthenticated, logout, user} = useAuth();
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const didFetch = useRef(false);
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState([]);

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

    const fetchData = async () => {
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

        const projectResponse = await axios.get(
            `http://${backHost}:${backPort}/api/projects/allProjects`,
            { params: { size: 100 } }
        );

        await axios.get(
            `http://${backHost}:${backPort}/api/tasks/allTasks-ProjectIds`,
            {
                params: {
                    uuids: projectResponse.data.map(project => project.id).join(',')
                },
            }
        ).then(res => setTasks(res.data));

        await axios.get(`http://${backHost}:${backPort}/api/tasks/allTaskStatus`)
            .then(res => setStatuses(res.data));
        return () => {
            mounted = false;
        };
    }

    const barStatusData = statuses.map(status =>
        tasks.filter(task => task.taskStatus === status).length);

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
        return <Navigate to="/500"/>;

    const deleteAccount = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Действительно удалить аккаунт?'))
            axios.delete(`http://${backHost}:${backPort}/api/auth/user/delete/${user.sub}`)
    }

    return (
        <div className="main">
            <div className="account-square"></div>
            <div className="account-ellipsis"></div>
            <div className="account-circle"></div>
            <div className="account-data">
                <div className="avatar">
                    <div className="avatar-wrapper">
                        <div className="avatar-wrapper-1">
                            {userData.avatars.length !== 0 && <div className="account-previous-image">
                                <FaAngleLeft/>
                            </div>}
                            <img className="avatar-link"
                                 src={userData.avatars.length !== 0 ? `data:${userData.avatars[0].contentType};base64,${userData.avatars[0].binaryData}`
                                     : "default-avatar.png"}
                                 alt="avatar image"/>
                            {userData.avatars.length !== 0 && <div className="account-next-image">
                                <FaAngleRight/>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="account-main-info">
                    <div className="account-data-group-1">
                        <div className="account-data-group-inner">
                            <span><FaRegCircleUser/> <strong>Юзернейм:</strong> {userData.username}</span></div>
                        <div className="account-data-group-inner">
                            <span><TiClipboard/> <strong>Имя:</strong> {userData.name}</span>
                        </div>
                        <div className="account-data-group-inner">
                            <span><TiClipboard/> <strong>Фамилия:</strong> {userData.lastName}</span></div>
                    </div>
                    <div className="account-data-group-2">
                        <div className="account-data-group-inner">
                            <span><MdAlternateEmail/> <strong>Почта:</strong> {userData.email}</span></div>
                        <div className="account-data-group-inner">
                            <span><CiCalendarDate/> <strong>Дата регистрации:</strong> {userData.dateRegistration.split('T')?.[0]}</span>
                        </div>
                    </div>
                    <div className="account-activity"
                         style={{backgroundColor: userData.activity ? "#acffc7" : "#ffbebe"}}>
                        <span><TbActivity/> <strong>Активность:</strong> {userData.activity.toString()}</span></div>
                    <div
                        className="account-roles"><span><MdOutlineAdminPanelSettings/> <strong>Роли:</strong> {userData.roles.map(role =>
                        <span key={role.id}>{role.role.split('_')?.[1]}</span>
                    )}</span></div>
                </div>
                <div className="account-buttons-container">
                    <div className="account-task-info">
                        <div className="account-task-info-item account-task-planing">Задач на этапе планирования: {barStatusData[0]}</div>
                        <div className="account-task-info-item account-task-in-progress">Задач в прогрессе: {barStatusData[1]}</div>
                        <div className="account-task-info-item account-task-finished">Завершённых задач: {barStatusData[2]}</div>
                        <div className="account-task-info-item account-task-canceled">Отменённых задач: {barStatusData[3]}</div>
                        <div className="account-task-info-item account-task-expired">Просроченных задач: {barStatusData[4]}</div>
                    </div>
                    <div className="group-buttons">
                        <Button onClickFunction={logout}>Выйти</Button>
                        <Button>Изменить аккаунт</Button>
                        <Button onClickFunction={() => navigate('/projects')}>К проектам</Button>
                        <Button onClickFunction={deleteAccount} backgroundColor="#f47c7c">Удалить аккаунт</Button>
                    </div>
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
        </div>
    )
}