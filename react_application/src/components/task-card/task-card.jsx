import './task-card.css'
import Button from "../button/button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ModalWindow from "../modal-window/modal-window";
import {FiAlertOctagon} from "react-icons/fi";
import {IoMdCheckmark} from "react-icons/io";
import {RxCross2} from "react-icons/rx";

export default function TaskCard({task, avatars}) {
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

    const deleteTask = () => {
        const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
        const backPort = process.env.REACT_APP_BACKEND_PORT;
        axios.delete(`http://${backHost}:${backPort}/api/tasks/delete/${task.id}`)
            .then(res => {
                if (res.status === 204)
                    navigate('/projects')
            })
    }

    return (
        <div className="container">
            <div
                className="anchor-task-card"
                role="button">
                <div className="main-info">
                    <img
                        className="image-task-card"
                        src={`data:${avatars[0].contentType};base64,${avatars[0].binaryData}`}
                        alt={`Аватар: ${avatars[0].name}`}/>
                    <h3 className="task-name">{task.name}</h3>
                </div>
                <div className="container-task-card-info">
                    {task.description && <p>{task.description}</p>}
                    <p className={`task-importance-${task.taskImportance.toLowerCase()}`}>
                        <FiAlertOctagon/> {`Важность: ${task.taskImportance}`}
                    </p>
                    <p>{`Статус: ${task.taskStatus}`}</p>
                    <p className={task.isFinished ? 'task-finished' : 'task-not-finished'}>
                        Завершена? {task.isFinished ? <IoMdCheckmark/> : <RxCross2/>}
                    </p>
                </div>
                <div className="task-card-buttons">
                    <Button onClickFunction={updateTask}>Изменить</Button>
                    <ModalWindow trigger={<Button>Удалить</Button>}>
                        {({close}) => (
                            <>
                                <h3>Действительно удалить задачу?</h3>
                                <p>{`Название задачи: ${task.name}`}</p>
                                <div className="modal-actions">
                                    <Button onClickFunction={close}>Нет</Button>
                                    <Button onClickFunction={() => {
                                        deleteTask();
                                        close();
                                    }}>Да
                                    </Button>
                                </div>
                            </>
                        )}
                    </ModalWindow>
                </div>
            </div>
        </div>
    )
}