import React from 'react';
import './navbar.css'

function Navbar()
{
    return (
        <nav>
            <ul>
                <li><a href={"/"}>Главная</a></li>
                <li>Аккаунт</li>
                <li className={"innerList"}>Проекты
                    <ul>
                        <li>Создать проект</li>
                        <li>Просмотр проектов</li>
                        <li>Инфографика</li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;