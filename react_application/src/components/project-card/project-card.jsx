import Button from "../button/button";
import './project-card.css';
import {useNavigate} from "react-router-dom";

export default function ProjectCard({project, avatars})
{
    const navigate = useNavigate();
    return (
        <div
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Перейти к проекту ${project.name}`}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/projects/${project.id}`)}
        >
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
                            <Button>Изменить</Button>
                            <Button>Удалить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}