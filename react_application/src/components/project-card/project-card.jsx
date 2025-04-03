import Button from "../button/button";
import './project-card.css';

export default function ProjectCard({project, avatars}) {
    return (
        <div className="project-card-main">
            <div className="project-card-container">
                <img
                    src={`data:${avatars[0].contentType};base64,${avatars[0].binaryData}`}
                    alt={`Название: ${avatars[0].name}`}
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
    )
}