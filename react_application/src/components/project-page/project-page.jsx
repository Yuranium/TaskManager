import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {CiCirclePlus} from "react-icons/ci";
import axios from "axios";
import Button from "../button/button";
import './project-page.css'
import TaskCard from "../task-card/task-card";

export default function ProjectPage({projectId}) {
    //const {id} = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const didFetch = useRef(false);
    const [projectEmpty, setProjectEmpty] = useState(false);


    // todo проверять на наличие данного проекта на бэке
    const fetchTasks = async () => {
        try {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST
            const backPort = process.env.REACT_APP_BACKEND_PORT
            const response = await axios.get(
                `http://${backHost}:${backPort}/api/tasks/getAllTasks`, {
                    params: {
                        projectId: projectId
                    }
                });
            setTasks(response.data);
            console.log(response.data)
        } catch (err) {
            if (err.response?.status === 404)
                navigate('/404');
        } finally {
            if (!tasks || tasks.length === 0)
                setProjectEmpty(true)
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!didFetch.current) {
            didFetch.current = true;
            fetchTasks();
        }

        fetchTasks();
    }, [navigate]);

    if (loading) return <div>Загрузка проекта...</div>;

    if (projectEmpty)
        return (
            <div>
                Данный проект на данный момент пустой
            </div>
        )

    return (
        <div className="project-page-main">
            <aside className="project-sidebar">
                <h3>Проекты</h3>
                <label htmlFor="project-search" className="project-page-label"></label>
                <input
                    type="text"
                    placeholder="Найти проект"
                    name="projectSearch"
                    id="project-search"/>
                <ul>
                    <li>Проект №1</li>
                    <li>Проект №2</li>
                    <li>Проект №3</li>
                </ul>
            </aside>

            <div className="project-page-main-1">
                <nav className="task-navbar">
                    <Button><CiCirclePlus /></Button>

                    <label htmlFor="task-search" className="project-page-label"></label>
                    <input
                        type="text"
                        placeholder="Найти задачу"
                        name="projectSearch"
                        id="task-search"/>

                    <span className="task-status-filter">
                        <label htmlFor="task-status-sort" className="project-page-label">
                            Сортировка по статусу:</label>
                        <select id="task-status-sort">
                            <option value=""></option>
                            <option value="PLANING">В планах</option>
                            <option value="IN_PROGRESS">В процессе</option>
                            <option value="COMPLETED">Завершена</option>
                            <option value="CANCELED">Отменена</option>
                            <option value="EXPIRED">Просрочена</option>
                        </select>
                    </span>

                    <span className="task-importance-filter">
                        <label htmlFor="task-importance-sort" className="project-page-label">
                            Сортировка по важности:</label>
                        <select id="task-importance-sort">
                            <option value=""></option>
                            <option value="LOW">Низкая</option>
                            <option value="INTERMEDIATE">Средняя</option>
                            <option value="HIGH">Высокая</option>
                        </select>
                    </span>

                    <span className="task-finish-filter">
                        <label htmlFor="task-is-finish" className="project-page-label">
                            Задача завершена?</label>
                        <input
                            type="checkbox"
                            id="task-is-finish"/>
                    </span>
                </nav>
                {
                    tasks.map(task => {
                        return <TaskCard task={task} avatars={task.avatars} />
                    })
                }
            </div>
        </div>
    );
}