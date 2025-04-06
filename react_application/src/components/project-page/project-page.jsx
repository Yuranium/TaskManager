import {useEffect, useRef, useState} from "react";
import {CiCirclePlus} from "react-icons/ci";
import axios from "axios";
import Button from "../button/button";
import './project-page.css'
import TaskCard from "../task-card/task-card";
import Http404 from "../http-error/404";
import {useParams} from "react-router-dom";
import ModalWindow from "../modal-window/modal-window";

export default function ProjectPage() {
    const {projectId} = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectEmpty, setProjectEmpty] = useState(false);
    const [projectExists, setProjectExists] = useState(true);
    const didFetch = useRef(false);

    const fetchTasks = async () => {
        try {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
            const backPort = process.env.REACT_APP_BACKEND_PORT;
            const [tasksRes, projectRes] = await Promise.all([
                axios.get(`http://${backHost}:${backPort}/api/tasks/allTasks`, {
                    params: {projectId}
                }),
                axios.get(`http://${backHost}:${backPort}/api/projects/${projectId}`)
            ]);

            if (projectRes.status === 200)
                setProjectExists(true);

            const tasksData = tasksRes.data;
            if (Array.isArray(tasksData) && tasksData.length > 0)
                setTasks(tasksData);
            else setProjectEmpty(true);
        } catch (err) {
            console.error("Ошибка получения данных:", err);
            setProjectExists(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!didFetch.current) {
            didFetch.current = true;
            fetchTasks();
        }
    }, []);

    if (loading) return <div>Загрузка проекта...</div>;
    if (!projectExists) return <Http404/>;
    if (projectEmpty)
        return (
            <div className="project-empty">
                <div className="project-page-wrapper-empty">
                    <p>Данный проект на данный момент пустой</p>
                    <ModalWindow projectId={projectId} isNewTask={true}/>
                </div>
            </div>);

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
                    <Button><CiCirclePlus/></Button>

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
                        return <TaskCard task={task} avatars={task.avatars}/>
                    })
                }
            </div>
        </div>
    );
}