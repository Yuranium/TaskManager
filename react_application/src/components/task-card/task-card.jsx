import './task-card.css'
import Button from "../button/button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function TaskCard({task, avatars})
{
    const navigate = useNavigate()

    const openTask = (e) => {
        if (e.target.closest(".task-card-buttons"))
            return;
        navigate(`/projects/${task.id}`);
    }

    const updateTask = (e) => {
        e.stopPropagation()
        //return <ModalWindow task={task} isNewTask={false}/>
        navigate(`updateTask/${task.id}`)
    }

    const deleteTask = (e) => {
        e.stopPropagation()
        // eslint-disable-next-line no-restricted-globals
        let confirmDelete = confirm("Действительно удалить задачу?")
        if (confirmDelete)
        {
            const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
            const backPort = process.env.REACT_APP_BACKEND_PORT;
            axios.delete(`http://${backHost}:${backPort}/tasks/delete/${task.id}`)
                .then(res => {
                    if (res.status === 204)
                        navigate('/projects')
                })
        }
    }

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
                    <p>{`Завершена? ${task.isFinished ? 'Да' : 'Нет'}`}</p>
                </div>
                <div className="task-card-buttons">
                    <Button onClickFunction={updateTask}>Изменить</Button>
                    <Button onClickFunction={deleteTask}>Удалить</Button>
                </div>
            </div>
        </div>
    )
}