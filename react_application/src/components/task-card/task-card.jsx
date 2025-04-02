import './task-card.css'
import Button from "../button/button";

export default function TaskCard({task}) {
    return (
        <div className="main">
            <div className="container">
                <a className="anchor-task-card" href={`/tasks/${task.id}`}>
                    <div className="main-info">
                        <img className="image-task-card" src="../account/Кактус.png" alt="avatar"/>
                        <p className="task-name">{task.name}</p>
                    </div>
                    <div className="container-task-card-info">
                        <p>{task.description}</p>
                        <p>{task.importance}</p>
                        <p>{task.status}</p>
                        <p>{task.dateFinish}</p>
                    </div>
                    <div className="buttons">
                        <Button>Изменить</Button>
                        <Button>Удалить</Button>
                    </div>
                </a>
            </div>
        </div>
    )
}