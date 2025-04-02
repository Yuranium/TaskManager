'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import './new-task-form.css'
import Button from "../../button/button";

export default function NewTaskForm() {
    const [data, setData] = useState({
        allImportance: [],
        allStatus: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [importanceRes, statusRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/tasks/allTaskImportance'),
                    axios.get('http://localhost:8080/api/tasks/allTaskStatus')
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

    return (
        <div className="parent">
            <form method="POST" encType="multipart/form-data" className="newTaskForm">
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
                        rows="15"
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