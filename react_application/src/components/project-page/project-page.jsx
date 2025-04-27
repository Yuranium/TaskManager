import {useEffect, useMemo, useRef, useState} from "react";
import {CiCirclePlus} from "react-icons/ci";
import axios from "axios";
import './project-page.css';
import TaskCard from "../task-card/task-card";
import Http404 from "../info/http-error/404";
import {Link, useNavigate, useParams} from "react-router-dom";
import ModalWindow from "../modal-window/modal-window";
import Autosuggest from "react-autosuggest";
import {useAuth} from "../../hooks/auth";

export default function ProjectPage() {
    const {user} = useAuth();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectEmpty, setProjectEmpty] = useState(false);
    const [projectExists, setProjectExists] = useState(true);
    const [projectList, setProjects] = useState([]);
    const didFetch = useRef(false);

    const [projSearch, setProjSearch] = useState("");
    const [projSuggestions, setProjSuggestions] = useState([]);

    const [taskSearch, setTaskSearch] = useState("");
    const [taskSuggestions, setTaskSuggestions] = useState([]);

    const [statusFilter, setStatusFilter] = useState("");
    const [importanceFilter, setImportanceFilter] = useState("");
    const [isFinished, setFinished] = useState(null);

    const filteredTasks = useMemo(() => {
        return tasks.filter((t) => {
            const searchMatch =
                taskSearch.trim() === "" ||
                t.name.toLowerCase().includes(taskSearch.trim().toLowerCase()) ||
                t.description.toLowerCase().includes(taskSearch.trim().toLowerCase()) ||
                t.taskStatus.toLowerCase().includes(taskSearch.trim().toLowerCase()) ||
                t.taskImportance.toLowerCase().includes(taskSearch.trim().toLowerCase());
            const statusMatch = statusFilter ? t.taskStatus === statusFilter : true;
            const importanceMatch = importanceFilter ? t.taskImportance === importanceFilter : true;
            const finishedMatch = isFinished === null ? true : t.isFinished === isFinished;
            return searchMatch && statusMatch && importanceMatch && finishedMatch;
        });
    }, [taskSearch, statusFilter, importanceFilter, isFinished, tasks]);

    const getProjSuggestions = value => {
        const v = value.trim().toLowerCase();
        return v.length === 0
            ? []
            : projectList.filter(p =>
                p.name.toLowerCase().includes(v) ||
                p.description.toLowerCase().includes(v)
            );
    };

    const onProjFetch = ({ value }) => {
        setProjSuggestions(getProjSuggestions(value));
    };
    const onProjClear = () => setProjSuggestions([]);

    const getProjValue = suggestion => suggestion.name;
    const renderProj = suggestion => <div>{suggestion.name}</div>;

    const projInputProps = {
        placeholder: "Найти проект...",
        value: projSearch,
        onChange: (e, { newValue }) => setProjSearch(newValue),
        id: "project-search",
    };

    const getTaskSuggestions = value => {
        const v = value.trim().toLowerCase();
        return v.length === 0
            ? []
            : tasks.filter(t =>
                t.name.toLowerCase().includes(v) ||
                t.description.toLowerCase().includes(v) ||
                t.taskStatus.toLowerCase().includes(v) ||
                t.taskImportance.toLowerCase().includes(v)
            );
    };

    const onTaskFetch = ({ value }) => setTaskSuggestions(getTaskSuggestions(value));
    const onTaskClear = () => setTaskSuggestions([]);

    const getTaskValue = suggestion => suggestion.name;
    const renderTask = suggestion => <div>{suggestion.name}</div>;

    const taskInputProps = {
        placeholder: "Найти задачу...",
        value: taskSearch,
        onChange: (e, { newValue }) => setTaskSearch(newValue),
        id: "task-search",
    };

    const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
    const backPort = process.env.REACT_APP_BACKEND_PORT;

    const fetchTasks = async () => {
        try {
            const [tasksRes, projectRes] = await Promise.all([
                axios.get(`http://${backHost}:${backPort}/api/tasks/allTasks`, {
                    params: { projectId },
                }),
                axios.get(`http://${backHost}:${backPort}/api/projects/${projectId}`),
            ]);

            if (projectRes.status === 200) setProjectExists(true);

            const t = tasksRes.data;
            if (Array.isArray(t) && t.length > 0) {
                setTasks(t);
                const resp = await axios.get(
                    `http://${backHost}:${backPort}/api/projects/allProjects`,
                    { params: { size: 50, userId: user.id } }
                );
                if (resp.status === 200) setProjects(resp.data);
            } else {
                setProjectEmpty(true);
            }
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
        didFetch.current = false;
    }, [projectId]);

    const handleStatusChange = (e) => setStatusFilter(e.target.value);

    const handleImportanceChange = (e) => setImportanceFilter(e.target.value);

    const handleFinishedChange = (e) => setFinished(e.target.checked ? true : null);

    if (loading) return <div>Загрузка проекта...</div>;
    if (!projectExists) return <Http404 />;
    if (projectEmpty)
        return (
            <div className="project-empty">
                <div className="project-page-wrapper-empty">
                    <p>Данный проект на данный момент пустой</p>
                    <ModalWindow projectId={projectId} isNewTask={true} />
                </div>
            </div>
        );

    return (
        <div className="project-page-main">
            <aside className="project-sidebar">
                <h3>Проекты</h3>
                <Autosuggest
                    suggestions={projSuggestions}
                    onSuggestionsFetchRequested={onProjFetch}
                    onSuggestionsClearRequested={onProjClear}
                    getSuggestionValue={getProjValue}
                    renderSuggestion={renderProj}
                    inputProps={projInputProps}
                    onSuggestionSelected={(e, { suggestion }) => {
                        navigate(`/projects/${suggestion.id}`);
                    }}
                />
                <ul>
                    {projectList
                        .filter(p => p.id !== projectId)
                        .map(p => (
                            <li key={p.id}>
                                <Link to={`/projects/${p.id}`}>{p.name}</Link>
                            </li>
                        ))}
                </ul>
            </aside>

            <div className="project-page-main-1">
                <nav className="task-navbar">
                    <ModalWindow projectId={projectId}><CiCirclePlus/></ModalWindow>

                    <Autosuggest
                        suggestions={taskSuggestions}
                        onSuggestionsFetchRequested={onTaskFetch}
                        onSuggestionsClearRequested={onTaskClear}
                        getSuggestionValue={getTaskValue}
                        renderSuggestion={renderTask}
                        inputProps={taskInputProps}
                    />

                    <span className="task-status-filter">
                        <label htmlFor="task-status-sort" className="project-page-label">
                            Сортировка по статусу:</label>
                        <select id="task-status-sort"
                                onChange={handleStatusChange}
                                value={statusFilter}>
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
                        <select id="task-importance-sort"
                                onChange={handleImportanceChange}
                                value={importanceFilter}>
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
                            id="task-is-finish"
                            onChange={handleFinishedChange}/>
                    </span>
                </nav>

                <div className="project-page-container">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            avatars={task.images}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}