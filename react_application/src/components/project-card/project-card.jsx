import Button from "../button/button";
import './project-card.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ModalWindow1 from "../modal-window/modal-window-1";

export default function ProjectCard({project, avatars}) {
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

    const deleteProject = () => {
        const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
        const backPort = process.env.REACT_APP_BACKEND_PORT;
        axios.delete(`http://${backHost}:${backPort}/api/projects/delete/${project.id}`)
            .then(res => {
                if (res.status === 204)
                    navigate('/projects')
            })
    }

    return (
        <div
            className="project-card"
            onClick={e => {
                if (e.target.closest('.project-card-buttons')) return;
                navigate(`/projects/${project.id}`);
            }}
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
                        <h2>{project.name}</h2>
                        <p>{`Описание: ${project.description}`}</p>
                        <div>{`Дата добавления: ${project.dateAdded}`}</div>
                    </div>

                    <div className="project-card-buttons">
                        <div className="inner-buttons">
                            <Button onClickFunction={updateProject}>Изменить</Button>
                            <ModalWindow1 trigger={<Button>Удалить</Button>}>
                                {({close}) => (
                                    <>
                                        <h3>Действительно удалить?</h3>
                                        <p>{`Название проекта: ${project.name}`}</p>
                                        <div className="modal-actions">
                                            <Button onClickFunction={close}>Нет</Button>
                                            <Button onClickFunction={() => {
                                                deleteProject();
                                                close();
                                            }}>Да
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </ModalWindow1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}