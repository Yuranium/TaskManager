import React from 'react';
import './main.css'
import Button from "../button/button";

function Main()
{
    return (
        <div>
            <h1>Task-Manager</h1>
            <p>Инструмент для отслеживания поставленных задач</p>
            <h2>Создать новый проект</h2>
            <Button>Создать проект</Button>
        </div>
    )
}

export default Main;