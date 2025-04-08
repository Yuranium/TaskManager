import React from 'react';
import './main.css'
import Button from "../button/button";
import {useNavigate} from "react-router-dom";

export default function Main()
{
    const navigate = useNavigate()
    return (
        <div>
            <h1>Task-Manager</h1>
            <p>Инструмент для отслеживания поставленных задач</p>
            <h2>Создать новый проект</h2>
            <Button onClickFunction={() => navigate('/createProject')}>
                Создать проект
            </Button>
        </div>
    )
}