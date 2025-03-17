import React from 'react';
import './navbar.css'

function Navbar()
{
    return (
        <header>
            <nav>
                <ul className="navbar">
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Аккаунт</a></li>
                    <li><a href="#">Создать проект</a></li>
                    <li><a href="#">Просмотр проектов</a></li>
                    <li><a href="#">Инфографика</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;