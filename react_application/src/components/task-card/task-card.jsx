import './task-card.css'
import Button from "../button/button";
import {useNavigate} from "react-router-dom";

export default function TaskCard({task, avatars})
{
    const navigate = useNavigate()
    return (
        <div className="container">
            <div
                className="anchor-task-card"
                /*onClick={() => navigate(`/${task.id}`)}*/
                role="button">
                <div className="main-info">
                    <img
                        className="image-task-card"
                        src={`data:${avatars[0].contentType};base64,${avatars[0].binaryData}`}
                        alt={`Аватар: ${avatars[0].name}`}/>
                    <h3 className="task-name">{task.name}</h3>
                </div>
                <div className="container-task-card-info">
                    <p>{task.description}</p>
                    <p>{`Важность: ${task.taskImportance}`}</p>
                    <p>{`Статус: ${task.taskStatus}`}</p>
                    <p>{task.isFinished}</p>
                </div>
                <div className="task-card-buttons">
                    <Button>Изменить</Button>
                    <Button>Удалить</Button>
                </div>
            </div>
        </div>
    )
}