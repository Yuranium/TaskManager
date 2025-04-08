import Button from "../button/button";
import './project-card.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function ProjectCard({project, avatars})
{
    const navigate = useNavigate();

    const openProject = (e) => {
        if (e.target.closest(".project-card-buttons"))
            return;
        navigate(`/projects/${project.id}`);
    }

    const updateProject = (e) => {
        e.stopPropagation()
        navigate(`updateProject/${project.id}`)
    }

    const deleteProject = (e) => {
        e.stopPropagation()
        // eslint-disable-next-line no-restricted-globals
        let confirmDelete = confirm("Действительно удалить проект?")
        if (confirmDelete)
        {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
            const backPort = process.env.REACT_APP_BACKEND_PORT;
            axios.delete(`http://${backHost}:${backPort}/projects/delete/${project.id}`)
                .then(res => {
                    if (res.status === 204)
                        navigate('/projects')
                })
        }
        // todo запрос на бэк для удаления проекта с каскадным удалением задач
    }

    return (
        <div
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Перейти к проекту ${project.name}`}
            onKeyDown={openProject}>
            <div className="project-card-main">
                <div className="project-card-container">
                    <img
                        src={`data:${avatars[0].contentType};base64,${avatars[0].binaryData}`}
                        alt={`Аватар: ${avatars[0].name}`}
                    />
                    <div className="text-info">
                        <h2>{`Название: ${project.name}`}</h2>
                        <p>{`Описание: ${project.description}`}</p>
                        <div>{`Дата добавления: ${project.dateAdded}`}</div>
                    </div>

                    <div className="project-card-buttons">
                        <div className="inner-buttons">
                            <Button onClickFunction={updateProject}>Изменить</Button>
                            <Button onClickFunction={deleteProject}>Удалить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}