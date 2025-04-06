'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import './task-form.css'
import Button from "../button/button";

export default function TaskForm({isNewTask, projectId}) {
    const [data, setData] = useState({
        allImportance: [],
        allStatus: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const backHost = process.env.REACT_APP_BACKEND_PROJECT_SERVICE_HOST;
                const backPort = process.env.REACT_APP_BACKEND_PORT;

                const [importanceRes, statusRes] = await Promise.all([
                    axios.get(`http://${backHost}:${backPort}/api/tasks/allTaskImportance`),
                    axios.get(`http://${backHost}:${backPort}/api/tasks/allTaskStatus`)
                ]);

                setData({
                    allImportance: importanceRes.data,
                    allStatus: statusRes.data,
                    loading: false,
                    error: null
                });
            } catch (error) {
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        };

        fetchData();
    }, []);


    const handleNewTask = (e) => {
        e.preventDefault()

    }

    return (
        <div className="parent">
            <form method="POST" onSubmit={handleNewTask} encType="multipart/form-data" className="newTaskForm">
                <h3>Создание новой задачи</h3>
                <div>
                    <label htmlFor="taskName">Название задачи:</label>
                    <input
                        placeholder="Введите название задачи"
                        id="taskName"
                        type="text"
                        name="taskName"
                        required
                    />
                </div>
                <div>
                    <fieldset>
                        <legend>Важность задачи</legend>
                        {data.allImportance.map((item) => (
                            <label key={item}>
                                <input
                                    type="radio"
                                    name="taskImportance"
                                    value={item}
                                />
                                {`${item}`}
                            </label>
                        ))}
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <legend>Статус задачи</legend>
                        {data.allStatus.map((item) => (
                            <label key={item}>
                                <input
                                    type="radio"
                                    name="taskStatus"
                                    value={item}
                                />
                                {`${item}`}
                            </label>
                        ))}
                    </fieldset>
                </div>
                <div>
                    <label htmlFor="dateFinish">Дедлайн:</label>
                    <input type="date" id="dateFinish" name="dateFinish" required/>
                </div>
                <div>
                    <label htmlFor="taskDescription" className="taskDescriptionLabel">
                        Описание задачи:
                    </label>
                    <textarea
                        placeholder="Описание (опционально)"
                        id="taskDescription"
                        name="taskDescription"
                        rows="12"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="taskPhoto">Выберите фото для задачи</label>
                    <input
                        id="taskPhoto"
                        type="file"
                        name="taskPhoto"
                        accept="image/jpeg, image/png, image/gif"
                    />
                    <p className="fileFormat">Формат файлов: PNG, JPEG, GIF</p>
                </div>
                <Button>Создать</Button>
            </form>
        </div>
    )
}