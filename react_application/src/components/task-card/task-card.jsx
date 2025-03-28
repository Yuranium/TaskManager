import './task-card.css'

export default function TaskCard({task}) {
    return (
        <div className="main">
            <div className="container">
                <a href={`/tasks/${task.id}`}>
                    <div className="main-info">
                        <img src="../account/Кактус.png" alt="avatar"/>
                        <p className="task-name">{task.name}</p>
                    </div>
                    <p>{task.description}</p>
                    <p>{task.importance}</p>
                    <p>{task.status}</p>
                    <p>{task.dateFinish}</p>
                    <div className="buttons">
                        <button>Изменить</button>
                        <button>Удалить</button>
                    </div>
                </a>
            </div>
        </div>
    )
}